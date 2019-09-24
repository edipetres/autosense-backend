const request = require('supertest');
const expect = require('chai').expect;

describe('Vehicles endpoint', () => {

  let tempVehicleId

  it('returns array of vehicles', function it(done) {
    request(`http://localhost:3000`)
      .get(`/vehicles`)
      .expect(200)
      .end(function (error, result) {
        if (error) {
          return done(error);
        }

        expect(result.body.success).to.eq(true)
        expect(result.body.payload).to.be.an('array')
        expect(result.body.payload.length).to.be.at.least(1)

        tempVehicleId = result.body.payload[0]._id
        expect(tempVehicleId).to.be.a('string')

        done();
      });
  });

  it('can change a cars registration number', function it(done) {
    const newRegistrationNumber = "ZH - test " + new Date().toLocaleDateString()

    request(`http://localhost:3000`)
      .put(`/vehicles/` + tempVehicleId)
      .send({
        "newRegistrationNumber": newRegistrationNumber
      })
      .expect(200)
      .end(function (error, result) {
        if (error) {
          return done(error);
        }

        expect(result.body.success).to.eq(true)
        expect(result.body.payload).to.be.an('object')
        expect(result.body.payload._id).to.eq(tempVehicleId)
        expect(result.body.payload.registration).to.eq(newRegistrationNumber)

        done();
      });
  });

  it('responds with error if request body is missing', function it(done) {
    const newRegistrationNumber = "ZH - test " + new Date().toLocaleDateString()

    request(`http://localhost:3000`)
      .put(`/vehicles/` + tempVehicleId)
      .expect(412)
      .end(function (error, result) {
        if (error) {
          return done(error);
        }

        expect(result.body.success).to.eq(false)

        done();
      });
  });

});