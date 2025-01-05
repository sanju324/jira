import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
	const [data, setdata] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, seterror] = useState(null);

	const fn = async (...args) => {
		setLoading(true);
		seterror(null);
		try {
			const res = await cb(...args);
			setdata(res);
		} catch (error) {
			seterror(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, fn, setdata };
};

export default useFetch;
