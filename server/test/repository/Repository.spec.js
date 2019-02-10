const expect = require('chai').expect;

const pool = require('../../src/repository/connection-pool.js');
const repository = require('../../src/repository/repository.js');

describe('repository', () => {
    let repo;
    let stub;
    let record;
    const tableName = 'test';
    const getMockRecord = () => ({
        id: 5,
        foo: 'bar',
        num: 123
    });

    const mockPool = () => ({
        query: () => { }
    });

    const mockQuery = async () => await Promise.resolve();

    beforeEach(function () {
        repo = repository.new(tableName);
        record = getMockRecord();
        const connPool = mockPool();
        stub = this.sandbox.stub(connPool, 'query').callsFake(mockQuery);
        this.sandbox.stub(pool, 'get').returns(connPool);
    });

    it('gets a record', async () => {
        await repo.get(record.id);
        expect(stub).to.have.been
            .calledWith('SELECT * FROM $1 WHERE Id = $2', [tableName, 5]);
    });

    it('gets all records', async () => {
        const results = await repo.getAll();
        expect(stub).to.have.been
            .calledWith('SELECT * FROM $1', [tableName]);
        expect(Array.isArray(results)).to.be.true;
    });

    it('adds a new record', async () => {
        delete record.id;
        await repo.add(record);
        const expectedSql = 'INSERT INTO $1(foo, num) VALUES($2, $3) RETURNING id';
        expect(stub).to.have.been
            .calledWith(expectedSql, [tableName, record.foo, record.num]);
    });

    it('updates a record', async () => {
        await repo.update(record);
        const expectedSql = 'UPDATE $1 SET foo=$3, num=$4 WHERE ID = $2';
        expect(stub).to.have.been
            .calledWith(expectedSql, [tableName, record.id, record.foo, record.num]);
    });

    it('throws an error updating if no id is defined', async () => {
        delete record.id;
        try {
            await repo.update(record);
            expect(false).to.be.true;
        } catch (e) {
            expect(e.message).to.eql('Record requires an ID.');
        }
    });

    it('deletes a record', async () => {
        await repo.del(record.id);
        const expectedSql = 'DELETE FROM $1 WHERE ID = $2';
        expect(stub).to.have.been
            .calledWith(expectedSql, [tableName, record.id]);
    });
});
