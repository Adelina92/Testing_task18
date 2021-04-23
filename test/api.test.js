const axios = require('axios');
require('should');

const url1 = 'http://kodaktor.ru/api2/there/';
const url2 = 'http://kodaktor.ru/api2/andba/';
const cases = [0, 1, 2, 3, -1, 0.0001];
const formula = x => 36*x**2+48*x+15;

cases.forEach((testingValue) => {
    describe('test microservises with ' + testingValue, () => {
        it('test first', async () => {
            const { data:res } = await axios.get(url1 + testingValue);
            const isCorrect = Math.abs(res - formula(testingValue)) < Number.EPSILON;
            isCorrect.should.equal(true);
        })
        it('test second', async () => {
            const { data:res } = await axios.get(url2 + formula(testingValue));
            const isCorrect = Math.abs(res - testingValue) < Number.EPSILON;
            isCorrect.should.equal(true);
        })

        it('test both', async () => {
            const { data:res1 } = await axios.get(url1 + testingValue);
            const { data:res2 } = await axios.get(url2 + res1);
            const isCorrect = Math.abs(res2 - testingValue) < Number.EPSILON;
            isCorrect.should.equal(true);
        })

    })
});