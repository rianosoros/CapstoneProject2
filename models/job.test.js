const { BadRequestError, NotFoundError } = require('../expressError');
const db = require('../db');
const Job = require('./job');
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
} = require('./_testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

//create
describe('create', function () {
  const newJob = {
    title: 'new',
    salary: 100,
    equity: '0.1',
    companyHandle: 'c1',
  };

  test('works', async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual({
      id: expect.any(Number),
      title: 'new',
      salary: 100,
      equity: '0.1',
      companyHandle: 'c1',
    });
  });
});

//findAll
