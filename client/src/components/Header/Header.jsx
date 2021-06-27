import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

const Header = () => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to="/">Home</OptionLink>
      <OptionLink to="/staff">Staff</OptionLink>
      <OptionLink to="/clients">Clients</OptionLink>
      <OptionLink to="/appointments">Appointments</OptionLink>
    </OptionsContainer>
  </HeaderContainer>
);

export default Header;
