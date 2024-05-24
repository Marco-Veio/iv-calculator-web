import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await axios
    .get(
      "https://gamepress.gg/sites/default/files/aggregatedjson/pokemon-data-full-en-PoGO.json?832976931997972232"
    )
    .catch((error) => {
      console.error(error);
      return error.response;
    });

  return NextResponse.json(response.data);
}
