import React, { useMemo } from "react";
import { ExternalIcon } from "shared/lib/assets/icons/icons";
import styled from "styled-components";
import ReactPlayer from "react-player";

import { PrimaryText, Title } from "shared/lib/designSystem";
import colors from "shared/lib/designSystem/colors";
import theme from "shared/lib/designSystem/theme";

import { BaseInputContainer, SecondaryText } from "shared/lib/designSystem";
import { Button } from "shared/lib/components/Common/buttons";
import useGlobalAccess from "../../../hooks/useGlobalAccess";
import useScreenSize from "shared/lib/hooks/useScreenSize";
import { VIPLogo } from "shared/lib/assets/icons/logo";

export const CodeInput = styled.input<{
  inputWidth?: string;
  fontSize?: number;
  lineHeight?: number;
}>`
  width: ${(props) => props.inputWidth || "80%"};
  height: 100%;
  font-size: ${(props) => props.fontSize || 40}px;
  line-height: ${(props) => props.lineHeight || 64}px;
  color: ${colors.primaryText}80;
  border: none;
  background: none;
  font-family: VCR, sans-serif;
  text-align: center;
  text-transform: uppercase;

  &:focus::placeholder {
    color: transparent;
  }

  &:focus {
    color: ${colors.primaryText}80;
    background: none;
    border: none;
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const Container = styled.div<{ variant: "desktop" | "mobile" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -16px;

  ${(props) =>
    props.variant === "mobile" &&
    `
    height: 100%;
    align-items: center;
    justify-content:center;
  `}
`;

export const EnterButton = styled(Button)`
  background: ${colors.primaryText}24;
  color: ${colors.primaryText};

  &:hover {
    color: ${colors.primaryText};
  }
`;

const FormContainer = styled.div`
  z-index: 1;
  font-family: VCR, sans-serif;
  color: ${colors.primaryText};
  width: 100%;
  box-sizing: border-box;
  border-radius: ${theme.border.radius};
  background: ${colors.background.two};
  z-index: 1;
`;

const Link = styled.a`
  color: ${colors.primaryText};
  text-decoration: underline;

  &:hover {
    color: ${colors.primaryText}CC;
  }
`;

const WhitelistLogoContainer = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 100px;
  background: ${(props) => props.color}14;
`;

const WhitelistTitle = styled(Title)`
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 1px;
  text-align: center;
  margin: 10px 0px 30px 0px;
`;

const WhitelistDescription = styled(PrimaryText)`
  font-size: 16px;
  line-height: 24px;
  color: ${colors.text};
`;

const FloatingBackgroundContainer = styled.div<{ backgroundColor?: string }>`
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  ${(props) =>
    props.backgroundColor ? `background: ${props.backgroundColor};` : ""};
`;

interface TreasuryActionsFormProps {
  variant: "desktop" | "mobile";
}

const TreasuryActionsForm: React.FC<TreasuryActionsFormProps> = ({
  variant,
}) => {
  const color = "#fc0a54";
  const { handleInputChange, handleSubmission, error, code } =
    useGlobalAccess();
  const { video } = useScreenSize();

  const body = useMemo(() => {
    return (
      <div className="d-flex flex-column align-items-center p-4">
        <WhitelistLogoContainer color={color} className="mt-3">
          <VIPLogo height={64} />
        </WhitelistLogoContainer>

        <WhitelistTitle className="mt-3">ACCESS CODE REQUIRED</WhitelistTitle>

        <BaseInputContainer className="mb-2" error={error !== ""}>
          <CodeInput
            type="text"
            className="form-control"
            aria-label="ETH"
            placeholder="-"
            value={code}
            onChange={handleInputChange}
            inputWidth={"100%"}
            maxLength={6}
          />
        </BaseInputContainer>
        <EnterButton
          onClick={handleSubmission}
          type="button"
          color={colors.primaryText}
          className="btn mt-2 py-3 mb-2"
          disabled={code.length !== 6}
        >
          ENTER
        </EnterButton>
        {error !== "" && (
          <SecondaryText color={colors.red}>{error}</SecondaryText>
        )}

        <WhitelistDescription className="mx-3 mt-4 text-center">
          The Ribbon VIP product is currently in beta and access to the product
          is limited to Ribbon VIP partners.
        </WhitelistDescription>

        <PrimaryText className="d-block mt-3 mb-3">
          <Link
            href="https://www.research.ribbon.finance/blog/introducing-ribbon-vip"
            target="_blank"
            rel="noreferrer noopener"
            className="d-flex"
          >
            <span className="mr-2">Learn More</span>
            <ExternalIcon color="white" />
          </Link>
        </PrimaryText>
      </div>
    );
  }, [error, code, handleInputChange, handleSubmission]);

  return (
    <Container variant={variant}>
      <FormContainer>{body}</FormContainer>
      <FloatingBackgroundContainer>
        <ReactPlayer
          key="video-player"
          url="https://player.vimeo.com/video/722230744?h=772ecba04a&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          playing={true}
          width={video.width}
          height={video.height}
          style={{
            minWidth: video.width,
            minHeight: video.height,
          }}
          muted
          loop
        />
      </FloatingBackgroundContainer>
      <FloatingBackgroundContainer backgroundColor="#000000CC" />
    </Container>
  );
};

export default TreasuryActionsForm;
