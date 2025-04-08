import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const applicationsSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	streetAddress: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	zipCode: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	indoorOutdoor: {
		type: String,
		required: true,
	},
	humansInHouse: {
		type: String,
		required: true,
	},
	dogsInHouse: {
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
	veternarianReference: {
		type: String,
		required: true,
	},
	personalReference: {
		type: String,
		required: true,
	},
	otherPets: {
		type: String,
		required: true,
	},
	misc: {
		type: String,
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
