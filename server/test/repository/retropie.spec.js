const expect = require('chai').expect;

const retropieRepo = require('../../src/repository/retropie.js');

describe('retropie repo', () => {
    let repo;

    beforeEach(() => {
        repo = retropieRepo.get();
    });

    it('is a repo for the RetroPie table', () => {
        expect(repo.table).to.eql('RetroPie');
    });

    it('implements get', () => {
        expect(typeof repo.get).to.eql('function');
    });

    it('implements getAll', () => {
        expect(typeof repo.getAll).to.eql('function');
    });

    it('implements add', () => {
        expect(typeof repo.add).to.eql('function');
    });

    it('implements update', () => {
        expect(typeof repo.update).to.eql('function');
    });

    it('implements delete', () => {
        expect(typeof repo.del).to.eql('function');
    });
});