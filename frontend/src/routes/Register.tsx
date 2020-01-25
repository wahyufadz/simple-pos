import React from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Jumbotron } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

export default function Register() {
  const { handleSubmit, errors, control, watch } = useForm(),
    onSubmit = values => {
      console.log(values);
      postRegister(values);
    },
    postRegister = async ({ email, username, password }) => {
      const body = { email, username, password };
      try {
        const res = await axios.post(
          "http://127.0.0.1:3333/api/v1/auth/register",
          body
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
    checkAvailableUsernameEmail = async (type, data) => {
      try {
        const body = { type, data };
        const res = await axios.post(
          "http://127.0.0.1:3333/api/v1/auth/check-email-username",
          body
        );
        if (typeof res.data.error !== "undefined") {
          return res.data.error.message;
        }
        return true;
      } catch (err) {
        console.log(err);
        return err;
      }
    };

  return (
    <div id="Register">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Jumbotron>
              <h1>Register</h1>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Controller
                    as={<Form.Control />}
                    name="email"
                    type="email"
                    defaultValue=""
                    placeholder="Please type your Email"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "email is required"
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
                      },
                      validate: async value =>
                        await checkAvailableUsernameEmail("email", value)
                    }}
                  />

                  {errors.email && (
                    <b style={{ color: "red" }}>{errors.email["message"]}</b>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Controller
                    as={<Form.Control />}
                    name="username"
                    type="text"
                    defaultValue=""
                    placeholder="Please type your Username"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Username is required"
                      },
                      minLength: {
                        value: 4,
                        message: "Minimum 4 character"
                      },
                      validate: async value =>
                        await checkAvailableUsernameEmail("username", value)
                    }}
                  />
                  {errors.username && (
                    <b style={{ color: "red" }}>{errors.username["message"]}</b>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Controller
                    as={<Form.Control />}
                    control={control}
                    name="password"
                    type="password"
                    defaultValue=""
                    placeholder="Please type your Password"
                    rules={{
                      required: {
                        value: true,
                        message: "Password is required"
                      },
                      minLength: {
                        value: 4,
                        message: "Minimum 4 character"
                      }
                    }}
                  />
                  {errors.password && (
                    <b style={{ color: "red" }}>{errors.password["message"]}</b>
                  )}
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="confirmPassword">
                    Confirm Password
                  </Form.Label>

                  <Controller
                    as={<Form.Control />}
                    control={control}
                    name="confirmPassword"
                    type="password"
                    defaultValue=""
                    placeholder="Please re type your password to confirm"
                    rules={{
                      validate: value =>
                        value === watch("password")
                          ? true
                          : "password not match"
                    }}
                  />
                  {errors.confirmPassword && (
                    <b style={{ color: "red" }}>
                      {errors.confirmPassword["message"]}
                    </b>
                  )}
                </Form.Group>

                <Button type="submit">Register</Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
