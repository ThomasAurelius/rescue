import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const surrenderSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4,
	},
	ownerName: {
		type: String,
		required: true,
	},
	ownerPhone: {
		type: String,
		required: true,
	},
	ownerEmail: {
		type: String,
		required: true,
	},
	ownerAddress: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	breed: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},

	sex: {
		enum: ["Male", "Female"],
		required: true,
	},
	ivddStatus: {
		type: String,
		default: false,
	},
	health: {
		type: String,
		default: false,
	},
	specialNeeds: {
		type: String,
		default: false,
	},
	notes: {
		type: String,
		default: false,
	},

	images: {
		type: Array,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});
