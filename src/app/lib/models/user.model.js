import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	lastLogin: {
		type: Date,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	profilePicture: {
		type: String,
		default: null,
	},
	bio: {
		type: String,
		default: null,
	},
	notifications: {
		type: Array,
		default: [],
	},
});
