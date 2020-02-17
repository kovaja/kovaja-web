export default function() {
  const baseUrl = "/api";
  return {
    admin () {
      const url = `${baseUrl}/admin`;

      return {
        init () {
          return `${url}/init`
        }
      }
    },
    github() {
      const url = `${baseUrl}/github`;

      return {
        user(): string {
          return `${url}/user`;
        },
        repos(): string {
          return `${url}/repos`;
        }
      };
    },
    pocket() {
      const url = `${baseUrl}/pocket`;

      return {
        articles(): string {
          return `${url}/articles`;
        }
      };
    },
    spotify() {
      const url = `${baseUrl}/spotify`;

      return {
        played(): string {
          return `${url}/played`;
        }
      };
    }
  };
}
