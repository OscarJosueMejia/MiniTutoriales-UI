import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import CategoryIcon from "@mui/icons-material/Category";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import "./admin.css";

export const mainListItems = (
  <React.Fragment>
    <div id="btn-contenido">
      <ListItemButton>
        <ListItemIcon>
          <DynamicFeedIcon />
        </ListItemIcon>
        <ListItemText
          onClick={() => {
            window.location.assign("hola");
          }}
          primary="Contenido"
        />
      </ListItemButton>
    </div>
    <div id="btn-categorias">
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText
          onClick={() => {
            window.location.assign("hola");
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
            window.location.assign("hola");
          }}
          primary="Usuarios"
        />
      </ListItemButton>
    </div>
    <div id="btn-administradores">
      <ListItemButton>
        <ListItemIcon>
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText
          onClick={() => {
            window.location.assign("hola");
          }}
          primary="Administradores"
        />
      </ListItemButton>
    </div>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <div id="btn-logout">
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText
          onClick={() => {
            window.location.assign("hola");
          }}
          primary="Cerrar Sesión"
        />
      </ListItemButton>
    </div>
  </React.Fragment>
);
