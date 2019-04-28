import React from "react"
import PropTypes from "prop-types"

import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from "react-share"

import {
  FacebookIcon,
  GooglePlusIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon,
} from "react-share"

import "../styles/share.scss"

const Share = ({ socialConfig, tags }) => (
  <div className="post-social">
    <FacebookShareButton url={socialConfig.config.url}>
      <FacebookIcon size={72} round={true} />
    </FacebookShareButton>
    <GooglePlusShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded googleplus"
    >
      <GooglePlusIcon size={72} round={true} />
    </GooglePlusShareButton>
    <LinkedinShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded linkedin"
      title={socialConfig.config.title}
    >
      <LinkedinIcon size={72} round={true} />
    </LinkedinShareButton>
    <RedditShareButton
      url={socialConfig.config.url}
      className="button is-outlined is-rounded reddit"
      title={socialConfig.config.title}
    >
      <RedditIcon size={72} round={true} />
    </RedditShareButton>
  </div>
)

Share.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}
Share.defaultProps = {
  tags: [],
}

export default Share
