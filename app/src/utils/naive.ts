import { createDiscreteApi } from "naive-ui";

const messageApi = createDiscreteApi(['message']);
export function createMessage() {
    return messageApi.message;
}