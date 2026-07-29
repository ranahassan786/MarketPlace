import { PostApi } from "../../util/ApiMethod";
import { loginApi} from "../../util/Routes";

export const loginService = PostApi({
   name:"login",
    url: loginApi

});