const expect = require('chai').expect;
const moment = require('moment');

const cacheFactory = require('../../src/service/cache.js');

describe('cache', () => {
    let cache;

    beforeEach(() => {
        cache = cacheFactory.get();
    });

    it('gets null when there is no matching item', () => {
        expect(cache.get('foo')).to.be.null;
    });

    it('gets null when the ttl has expired', (done) => {
        const key = 'test';
        cache.put(key, { foo: 'I CARE ABOUT THIS ONE' }, 5);
        setTimeout(function () {
            expect(cache.get(key)).to.be.null;
            done();
        }, 10);
    });

    it('gets the item when it is not expired', () => {
        const key = 'test';
        const item = { foo: 'bar' };
        cache.put(key, item, 500);
        expect(cache.get(key)).to.eql(item);
    });

    it('overwrites an item when the same key previously existed', () => {
        const key = 'test';
        const item = { foo: 'bar' };
        cache.put(key, item, 500);
        cache.put(key, { bar: 'baz' }, 500);
        expect(cache.get(key)).not.to.eql(item);
    });

    it('deletes an item', () => {
        const key = 'test';
        const item = { foo: 'bar' };
        cache.put(key, item, 500);
        cache.del(key);
        expect(cache.get(key)).to.be.null;
    });

    it('does not throw when deleting a key that does not exist', () => {
        const good = function () {
            cache.del('asdf');
        };
        expect(good).not.to.throw;
    });
});
