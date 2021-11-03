import {AuthActionCreators} from "./auth/actions-creators";
import {EventActionCreators} from "./event/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}