import { Users } from "@/mock/users";

export default function usePatients() {
    function searchUser(query:string) {
        return Users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
    }

    return { Users, searchUser }
}