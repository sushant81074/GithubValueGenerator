const axios = require("axios");

const fetchUserName = async (req, res) => {
  const { username = "defaultUser" } = req.params;
  if (!username) return res.status(400).send("username is required");
  const data = await dataFetcher(username);
  const value = valueGenerator(data);
  return res.status(200).send({
    message: "username fetched successfully",
    user: data.login,
    value: `  ${value} $ `,
  });
};

const dataFetcher = async (profileName) => {
  try {
    const { data } = await axios(`https://api.github.com/users/${profileName}`);
    return data;
  } catch (error) {
    return error.message;
  }
};

const valueGenerator = (userdata) => {
  try{
  const contributionWeight = 0.4;
  const popularityWeight = 0.3;
  const impactWeight = 0.2;
  const demandWeight = 0.1;

  const contributionScore = Number.parseFloat(userdata.public_repos) * 5;
  const popularityScore =
    Number.parseFloat(userdata.followers) * 1.5 +
    Number.parseFloat(userdata.following) * 1.5 +
    Number.parseFloat(userdata.public_gists) * 2;
  let impactScore = (userdata.total_private_repos ? 1 : 0) * 8;
  const demandScore = Number.parseFloat(userdata.hireable ? 50 : 0);

  const totalValue =
    contributionScore * contributionWeight +
    popularityScore * popularityWeight +
    impactScore * impactWeight +
    demandScore * demandWeight;

  return totalValue;
  }
  catch(error){
    console.log(error.message)  
    return -1;
  }
};

module.exports = { fetchUserName };
