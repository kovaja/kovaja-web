import { Constants } from "./constants";

export default function() {
  return {
    github: function() {
      let url = "https://api.github.com";

      return {
        user: function(): string {
          return `${url}/users/${Constants.userName}`;
        },
        repos: function(): string {
          return `${url}/users/${Constants.userName}/repos`;
        }
      };
    }
  };
}
