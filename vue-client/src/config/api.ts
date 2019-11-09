export default function() {
    return {
      github:  function() {
        let url = 'https://api.github.com';

        return {
          users: function(user: string): string {
            return `${url}/users/${user}`;
          }
        }
      }
    };
}
