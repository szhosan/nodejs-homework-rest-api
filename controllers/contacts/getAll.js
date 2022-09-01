const { Contact } = require("../../models/contactModel");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    page: currentPage = 1,
    limit: perPageLimit = 10,
    favorite = ["false", "true"],
  } = req.query;
  const skip = (currentPage - 1) * perPageLimit;
  const contactsAmount = await Contact.find({
    owner,
    favorite: { $in: favorite },
  }).count();
  const result = await Contact.find(
    { owner, favorite: { $in: favorite } },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(perPageLimit),
    }
  ).populate("owner", "email");
  res.json({ contactsAmount, currentPage, perPageLimit, contacts: result });
};

module.exports = getAll;
