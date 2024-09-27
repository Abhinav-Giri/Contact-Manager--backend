const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res
    .status(200)
    .json({ contacts: contacts, message: "All Contacts are listed above" });
});

const getContact = asyncHandler(async (req, res) => {
  const singleContact = await Contact.findById(req.params.id);
  if (!singleContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(singleContact);
});

const postContact = asyncHandler(async (req, res) => {
  console.log("Req body is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const postNewContacts = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  postNewContacts.save();
  res
    .status(200)
    .json({ newContact: postNewContacts, message: `Create Contact` });
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user contacts");
  }
  const deletedContact = await Contact.findByIdAndDelete({_id:req.params.id});
  res.status(200).json({ message: `Deleted contact ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContact,
  postContact,
  updateContact,
  deleteContact,
};
