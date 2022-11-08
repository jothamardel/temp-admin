import { CreateTagInput, UpdateTagInput } from "@ts-types/generated";
import Base from "./base";

class Tag extends Base<CreateTagInput, UpdateTagInput> {}

export default new Tag();
