const Enrollment = require("../../models/enrollmentModel");
const Course = require("../../models/enrollmentModel");
const { QueryTypes } = require("sequelize");
const Joi = require("joi");
const axios = require("axios");
const dB = require("../../config/database");

class EnrollmentService {
  async enrollUser(data, user) {
    try {
      const insertData = this.extractEnrollFields(data);
      insertData.customer_id = user.id;
      const enrollment = await Enrollment.create(insertData);
      return enrollment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getEnrollments() {
    try {
      return this._queryDB(
        "SELECT e.*, c.title, c.total_enrollments, ct.id as customer_id, ct.full_name, ct.phone_no, u.email_id FROM `enrollments` e INNER JOIN `customers` ct ON ct.id = e.customer_id INNER JOIN courses c ON c.id = e.course_id INNER JOIN users u on u.id = ct.user_id"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async viewEnrolledUser(data) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes: [
          ["id", "enrollment_id"],
          "customer_id",
          "course_id",
          "status",
          "payment_method",
          "payment_status",
          "enrollment_date",
          "created_at",
          "updated_at",
        ],
      });
      return enrollment;
    } catch (error) {
      return error.message;
    }
  }
  async viewEnrolledUserByCourseId(id) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes: [
          ["id", "enrollment_id"],
          "customer_id",
          "course_id",
          "status",
          "payment_method",
          "payment_status",
          "enrollment_date",
          "created_at",
          "updated_at",
        ],
        where: {
          course_id: id,
        },
      });
      return enrollment;
    } catch (error) {
      return error.message;
    }
  }
  async viewCourses(data) {
    try {
      const userResponse = await axios.get(
        `${process.env.COURSE_SERVICE_END_POINT}`
      );
      if (userResponse.data) {
        return userResponse.data;
      } else {
        return 409;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async viewCustomers() {
    try {
      const customerResponse = await axios.get(
        `${process.env.CUSTOMER_SERVICE_END_POINT}`
      );
      if (customerResponse.data) {
        return customerResponse.data;
      } else {
        return 409;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  extractEnrollFields(data) {
    return {
      course_id: data.course_id,
      payment_method: data.payment_method,
      payment_status: 1,
      status: 1,
    };
  }

  async getUserInfo(token) {
    try {
      const user_info = await axios.get(
        `${process.env.USER_SERVICE_END_POINT}/verify/token`,
        {
          headers: {
            Authorization: "Basic " + token,
          },
        }
      );
      if (null != user_info.data) {
        return user_info.data;
      } else {
        return 404;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async _queryDB(query, options = {}) {
    try {
      return await dB.query(query, { type: QueryTypes.SELECT, ...options });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = EnrollmentService;
