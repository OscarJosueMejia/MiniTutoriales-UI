import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import "./admin.css";
import { resetSecData } from "@store/Slices/securitySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const MainListItems = () => {
  const Navigator = useNavigate();
  return (
    <React.Fragment>
      <div id="btn-categorias">
        <ListItemButton>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              Navigator("/admin/categorias/list");
            }}
            primary="Categorías"
          />
        </ListItemButton>
      </div>
      <div id="btn-usuarios">
        <ListItemButton>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              Navigator("/admin/accesslist");
            }}
            primary="Usuarios"
          />
        </ListItemButton>
      </div>
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  const dispatch = useDispatch();
  const Navigator = useNavigate();

  return (
    <React.Fragment>
      <div id="btn-logout">
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              dispatch(resetSecData());
              localStorage.removeItem("reduxState");
              Navigator("/auth");
            }}
            primary="Cerrar Sesión"
          />
        </ListItemButton>
      </div>
    </React.Fragment>
  );
};
