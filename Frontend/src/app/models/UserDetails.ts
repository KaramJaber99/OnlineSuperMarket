export class UserDetails {
    public constructor(
        public id?: string,
        public email?: string,
        public password?: string,
        public userType?: string,
        public firstName?: string,
        public lastName?: string,
        public city?: string,
        public street?: string
    ) { }
}