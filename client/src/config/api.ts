export default function() {
  const baseUrl = "/api";
  return {
    github: function() {
      const url = `${baseUrl}/github`;

      return {
        user: function(): string {
          return `${url}/user`;
        },
        repos: function(): string {
          return `${url}/repos`;
        }
      };
    },
    pocket: function() {
      const url = `${baseUrl}/pocket`;

      return {
        articles: function(): string {
          return `${url}/articles`;
        }
      };
    },
    spotify: function() {
      const url = `${baseUrl}/spotify`;

      return {
        played: function(): string {
          return `${url}/played`;
        }
      };
    }
  };
}
