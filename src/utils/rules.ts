import moment, {Moment} from "moment";

export const rules = {
    required: (message: string) => ({required: true, message}),
    isDateAfter: (message: string) => () => ({
        validator(_: any, value: Moment) {
            // don't work correctly if value equal current date
            if (value.isSameOrAfter(moment())) {
                return Promise.resolve()
            }
            return Promise.reject(new Error(message));
        }
    })
}