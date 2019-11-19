import { IRepository } from "../interfaces/user-data.interface";

const fakeRepos: IRepository[] = [
  {
    id: 123,
    name: "Repository name",
    description: "Repository description",
    size: 1234,
    created_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
    html_url: "https://mall.cz"
  },
  {
    id: 12345,
    name: "Looong Repository name",
    description: "Looooooooooooooonger Repository description",
    size: 1234,
    created_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
    html_url: "https://mall.cz"
  }
];

export default fakeRepos;
