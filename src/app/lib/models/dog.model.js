import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const dogSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4,
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
	description: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	sex: {
		enum: ["Male", "Female"],
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	activityLevel: {
		type: String,
		required: true,
	},
	indoorOutdoor: {
		type: String,
		required: true,
	},
	goodWithKids: {
		type: String,
		required: true,
	},
	goodWithPets: {
		type: String,
		required: true,
	},
	healthStatus: {
		type: String,
		required: true,
	},
	trainingLevel: {
		type: String,
		required: true,
	},
	specialNeeds: {
		type: String,
		required: true,
	},
	adoptionFee: {
		type: Number,
		required: true,
	},
	species: {
		type: String,
		required: true,
	},
	companions: {
		type: Array,
		required: true,
	},
	size: {
		type: String,
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
