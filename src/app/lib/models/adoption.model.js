import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const adoptionsSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4,
	},
	dogName: {
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
	description: {
		type: String,
		required: true,
	},
	familyName: {
		type: String,
		required: true,
	},
	sex: {
		enum: ["Male", "Female"],
		required: true,
	},
	adoptionDate: {
		type: Date,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
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
