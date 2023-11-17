import { Feature, ModelType } from "../types";

export default async function getEstimatedPrice(model: ModelType, features: Feature | Feature[]) {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: 'Ridge', features: features }),
        };

        const estimated = fetch('http://127.0.0.1:8080/api/estimate', options)
            .then((response) => response.json())
            .then((data) => data.estimated)
            .catch((error) => console.log(error));

        return estimated;
    }
    catch (error: any) {
        throw new Error(error);
    }
}
