import { Constants } from "./constants";

export default function() {
  return {
    github: function() {
      let url = "/api/github";

      return {
        user: function(): string {
          return `${url}/user`;
        },
        repos: function(): string {
          return `https://api.github.com/users/${Constants.userName}/repos`;
        }
      };
    }
  };
}
