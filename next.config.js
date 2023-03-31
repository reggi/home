// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/download/storage/v1/b/brushwork-photos/o/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/source',
        destination: 'https://github.com/reggi/brushwork',
        permanent: true,
      },
      {
        source: "/bucket",
        destination: "https://console.cloud.google.com/storage/browser/brushwork-photos;tab=objects?project=brushwork-photos&supportedpurview=project&prefix=&forceOnObjectsSortingFiltering=false",
        permanent: true,
      }
    ]
  },
}
