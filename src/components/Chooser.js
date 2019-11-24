import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Chooser = ({ items, item, setItem, name, disabled }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel>Select your {name}</InputLabel>
        <Select
          value={item ? item : ""}
          disabled={disabled}
          onChange={e => setItem(e.target.value)}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item.length > 48 ? `${item.substr(0, 48)}...` : item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default Chooser;
