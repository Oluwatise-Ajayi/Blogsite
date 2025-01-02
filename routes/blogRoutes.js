const express = require("express");
const blogControllers = require("../controllers/blogControllers");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", blogControllers.blog_index);
router.post("/", blogControllers.blog_create_post)
router.get("/create",requireAuth, blogControllers.blog_create_get);
router.get("/:id", blogControllers.blog_details);
router.delete("/:id", blogControllers.blog_delete);

module.exports = router;
