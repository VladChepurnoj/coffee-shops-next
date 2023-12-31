import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
	const { id } = req.query;

	try {
		if (id) {
			// res.json({ message: `Id is created ${id}` });
			const findCoffeeRecords = await table
				.select({
					filterByFormula: `id="${id}"`,
				})
				.firstPage();

			const records = await findRecordByFilter(id);
			if (records.length !== 0) {
				res.json(records);
			} else {
				res.json({ message: `id could not be found` });
			}
		} else {
			res.status(500);
			res.json({ message: "Something went wrong", error });
		}
	} catch (error) {
		res.status(500);
		res.json({ message: "Something went wrong", error });
	}
};

export default getCoffeeStoreById;
