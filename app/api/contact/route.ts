import { handleContactRequest } from "./handler";

export async function POST(request: Request) {
  return handleContactRequest(request);
}
