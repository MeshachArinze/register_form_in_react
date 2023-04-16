import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3500",
});


export const IpAddress = async ({ setLoading, setIpData }) => {
    try {
        let res = await axios.get(
          `http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IP_ADDRESS_API_KEY}`
        );

        if (res) {
            setLoading(false);
            setIpData(res.data);
        }
    } catch (error) {
        console.log(`ip address error: ${error}`)
    }
}
