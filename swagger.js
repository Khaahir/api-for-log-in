import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API för att hantera användare",
    },
  },
  apis: ["./routes/*.js"], // ändra om dina routes ligger på annan plats
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
