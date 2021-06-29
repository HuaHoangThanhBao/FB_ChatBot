import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.use(express.static("./src"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}
module.exports = configViewEngine;