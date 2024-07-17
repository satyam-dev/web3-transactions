const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/transactions/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
