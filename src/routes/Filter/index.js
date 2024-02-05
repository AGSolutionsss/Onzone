import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { Drawer} from '@material-ui/core';
import {baseURL} from '../../api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IntlMessages from 'Util/IntlMessages';
import MUIDataTable from "mui-datatables";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    list: {
       width: 300,
    },
    floatButton: {
        position:'absolute',
        right:'0px',
        zIndex: '999',
        top:'213px',
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
 
    return (
       <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
       >
          {value === index && (
             <Box p={3}>
                <Typography>{children}</Typography>
             </Box>
          )}
       </div>
    );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Filter(props){

    const theme = useTheme();

    const [right, setRight] = useState(false);

    const [value, setValue] = React.useState(0);

    const toggleDrawer = (side, open) => () => {
        side(open)
        
    };

    

    const [userinfo, setUserInfo] = useState({
        fabric_inward_width:[],
        fabric_inward_sub_brand: [],
        fabric_inward_sub_color: [],
        fabric_inward_sub_design: [],
        fabric_inward_sub_type: [],
        fabric_inward_sub_color_theme: [],
        fabric_inward_sub_occasion: [],
        fabric_inward_sub_shrinkage: []
    });

    const handleChangeWidth = (e) => {
        
        const { value, checked } = e.target;
        const { fabric_inward_width } = userinfo;
          
        if (checked) {
          setUserInfo({
            ...userinfo,
            fabric_inward_width: [...fabric_inward_width, value],
          });
         
        }else {
          setUserInfo({
            ...userinfo,
            fabric_inward_width: fabric_inward_width.filter((e) => e !== value),
            
          });
        }
    };

    const handleChangeBrand = (e) => {
        
        const { value, checked } = e.target;
        const { fabric_inward_sub_brand } = userinfo;
          
        if (checked) {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_brand: [...fabric_inward_sub_brand, value],
          });
          
         
        }else {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_brand: fabric_inward_sub_brand.filter((e) => e !== value),
            
          });
        }
      
    };

    const handleChangeColor = (e) => {
        
        const { value, checked } = e.target;
        const { fabric_inward_sub_color } = userinfo;

        if (checked) {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_color: [...fabric_inward_sub_color, value],
          });
          
        }else {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_color: fabric_inward_sub_color.filter((e) => e !== value),
            
          });
        }
        
    };

    const handleChangeDesign = (e) => {
        
        const { value, checked } = e.target;
        const { fabric_inward_sub_design } = userinfo;
          
        if (checked) {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_design: [...fabric_inward_sub_design, value],
          });
        }else {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_design: fabric_inward_sub_design.filter((e) => e !== value),
            
          });
        }
        
    };

    const handleChangeType = (e) => {
        
        const { value, checked } = e.target;
        const { fabric_inward_sub_type } = userinfo;
          
        if (checked) {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_type: [...fabric_inward_sub_type, value],
          });
        }else {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_type: fabric_inward_sub_type.filter((e) => e !== value),
            
          });
        }
        
    };

    const handleChangeColorTheme = (e) => {
        
        const { value, checked } = e.target;
        const { fabric_inward_sub_color_theme } = userinfo;
          
        if (checked) {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_color_theme: [...fabric_inward_sub_color_theme, value],
          });
        }else {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_color_theme: fabric_inward_sub_color_theme.filter((e) => e !== value),
            
          });
        }
        
    };

    const handleChangeOccasion = (e) => {
      
      const { value, checked } = e.target;
      const { fabric_inward_sub_occasion } = userinfo;
        
      if (checked) {
        setUserInfo({
          ...userinfo,
          fabric_inward_sub_occasion: [...fabric_inward_sub_occasion, value],
        });
      }else {
        setUserInfo({
          ...userinfo,
          fabric_inward_sub_color_theme: fabric_inward_sub_color_theme.filter((e) => e !== value),
          
        });
      }
      
  };

    const handleChangeShrinkage = (e) => {
        
        const { value, checked } = e.target;
        const { fabric_inward_sub_shrinkage } = userinfo;
          
        if (checked) {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_shrinkage: [...fabric_inward_sub_shrinkage, value],
          });
        }else {
          setUserInfo({
            ...userinfo,
            fabric_inward_sub_shrinkage: fabric_inward_sub_shrinkage.filter((e) => e !== value),
            
          });
        }
        
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    
    const classes = useStyles();
    
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
 
            window.location = "/signin";
       
        }else{
 
        }
        var theLoginToken = localStorage.getItem('login');       
         
        const requestOptions = {
            method: 'POST', 
            headers: {
                'Authorization': 'Bearer '+theLoginToken,
            }             
        };     
    fetch(baseURL+'/fetch-fabric-inward-materials-filter-list', requestOptions)
    .then(response => response.json())
    .then(data => setDatas(data.fabricInward)); 
   }, []);

   const submitFilter = (e) => {
    e.preventDefault();
    let data = {
      fabric_inward_width: userinfo.fabric_inward_width,
      fabric_inward_sub_brand: userinfo.fabric_inward_sub_brand,
      fabric_inward_sub_color: userinfo.fabric_inward_sub_color,
      fabric_inward_sub_design: userinfo.fabric_inward_sub_design,
      fabric_inward_sub_type: userinfo.fabric_inward_sub_type,
      fabric_inward_sub_color_theme: userinfo.fabric_inward_sub_color_theme,
      fabric_inward_sub_occasion: userinfo.fabric_inward_sub_occasion,
      fabric_inward_sub_shrinkage: userinfo.fabric_inward_sub_shrinkage
    };

    axios({
      url: baseURL+"/fetch-fabric-inward-materials-filter-list",
      method: "POST",
      data,
      headers: {
      Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then(res => setDatas(res.data.fabricInward));
    
  }

   const columns = [
    {
     name: "fabric_inward_sub_barcode",
     label: "T Code",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "fabric_inward_sub_name",
     label: "P Code",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "fabric_inward_sub_brand",
     label: "Brand",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
       name: "fabric_inward_sub_color",
       label: "Color",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "fabric_inward_sub_design",
       label: "Design",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "fabric_inward_sub_type",
       label: "Type",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "fabric_inward_sub_color_theme",
       label: "Color Theme",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
        name: "fabric_inward_sub_occasion",
        label: "Occasion",
        options: {
         filter: true,
         sort: true,
        }
       },
      {
       name: "fabric_inward_sub_shrinkage",
       label: "Shrinkage",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "fabric_inward_sub_length",
       label: "Length",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "fabric_inward_sub_rate",
       label: "Rate",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
        name: "fabric_inward_sub_status",
        label: "Status",
        options: {
         filter: true,
         sort: true,
          customBodyRender: (value) => {
            return (
              value == 'Inward' ? <Badge color="primary"><IntlMessages id="In Stock" /></Badge> : <Badge color="warning"><IntlMessages id="Out of Stock" /></Badge>
            )
          }
        }
      },
    ];

    const options1 = {
        filterType: 'dropdown',
        selectableRows: false,
        viewColumns:false,
        print: false,
        download: false,
        filter: false,
    };

    const [colors, setColors] = useState([]);
    useEffect(() => {
     var isLoggedIn = localStorage.getItem("id");
     if(!isLoggedIn){
 
       window.location = "/signin";
       
     }else{
 
     }
 
     var theLoginToken = localStorage.getItem('login');       
         
       const requestOptions = {
             method: 'GET', 
             headers: {
                'Authorization': 'Bearer '+theLoginToken,
             }             
       };     
 
 
     fetch(baseURL+'/fetch-color', requestOptions)
     .then(response => response.json())
     .then(data => setColors(data.color)); 
   }, []);

   const [designs, setDesigns] = useState([]);
   useEffect(() => {
     var isLoggedIn = localStorage.getItem("id");
     if(!isLoggedIn){
 
       window.location = "/signin";
       
     }else{
 
     }
 
     var theLoginToken = localStorage.getItem('login');       
         
       const requestOptions = {
             method: 'GET', 
             headers: {
                'Authorization': 'Bearer '+theLoginToken,
             }             
       };     
 
 
     fetch(baseURL+'/fetch-design', requestOptions)
     .then(response => response.json())
     .then(data => setDesigns(data.design)); 
   }, []);

   const [types, setType] = useState([]);
   useEffect(() => {
     var isLoggedIn = localStorage.getItem("id");
     if(!isLoggedIn){
 
       window.location = "/signin";
       
     }else{
 
     }
 
     var theLoginToken = localStorage.getItem('login');       
         
       const requestOptions = {
             method: 'GET', 
             headers: {
                'Authorization': 'Bearer '+theLoginToken,
             }             
       };     
 
 
     fetch(baseURL+'/fetch-fab-type', requestOptions)
     .then(response => response.json())
     .then(data => setType(data.type)); 
   }, []);

   const [colorTheme, setColorTheme] = useState([]);
   useEffect(() => {
     var isLoggedIn = localStorage.getItem("id");
     if(!isLoggedIn){
 
       window.location = "/signin";
       
     }else{
 
     }
 
     var theLoginToken = localStorage.getItem('login');       
         
       const requestOptions = {
             method: 'GET', 
             headers: {
                'Authorization': 'Bearer '+theLoginToken,
             }             
       };     
 
 
     fetch(baseURL+'/fetch-color-theme', requestOptions)
     .then(response => response.json())
     .then(data => setColorTheme(data.colortheme)); 
   }, []);

   const [occasion, setOccasion] = useState([]);
   useEffect(() => {
     var isLoggedIn = localStorage.getItem("id");
     if(!isLoggedIn){
 
       window.location = "/signin";
       
     }else{
 
     }
 
     var theLoginToken = localStorage.getItem('login');       
         
       const requestOptions = {
             method: 'GET', 
             headers: {
                'Authorization': 'Bearer '+theLoginToken,
             }             
       };     
 
 
     fetch(baseURL+'/fetch-occasion', requestOptions)
     .then(response => response.json())
     .then(data => setOccasion(data.occasion)); 
   }, []);

   const [width, setWidth] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/fetch-width', requestOptions)
      .then(response => response.json())
      .then(data => setWidth(data.width)); 
    }, []);

    const [brand, setBrand] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/fetch-brand', requestOptions)
      .then(response => response.json())
      .then(data => setBrand(data.brand)); 
    }, []);

    

  const [shrinkage, setShrinkage] = useState([]);
  useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/fetch-shrinkage', requestOptions)
      .then(response => response.json())
      .then(data => setShrinkage(data.shrinkage)); 
    }, []);

    const clearFilter = (e) => {
      e.preventDefault();
      toggleDrawer(setRight,false);
      userinfo.fabric_inward_width = [];
      userinfo.fabric_inward_sub_brand = [];
      userinfo.fabric_inward_sub_color = [];
      userinfo.fabric_inward_sub_design = [];
      userinfo.fabric_inward_sub_type = [];
      userinfo.fabric_inward_sub_color_theme = [];
      userinfo.fabric_inward_sub_occasion = [];
      userinfo.fabric_inward_sub_shrinkage = [];
    
      let data = {
        fabric_inward_width: userinfo.fabric_inward_width,
        fabric_inward_sub_brand: userinfo.fabric_inward_sub_brand,
        fabric_inward_sub_color: userinfo.fabric_inward_sub_color,
        fabric_inward_sub_design: userinfo.fabric_inward_sub_design,
        fabric_inward_sub_type: userinfo.fabric_inward_sub_type,
        fabric_inward_sub_color_theme: userinfo.fabric_inward_sub_color_theme,
        fabric_inward_sub_occasion: userinfo.fabric_inward_sub_occasion,
        fabric_inward_sub_shrinkage: userinfo.fabric_inward_sub_shrinkage
      };

      axios({
        url: baseURL+"/fetch-fabric-inward-materials-filter-list",
        method: "POST",
        data,
        headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then(res => setDatas(res.data.fabricInward)); 
      
    }

    const sideList = (
        <div>
          <br/>
          <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "auto" }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              sx={{ borderLeft: 1, borderColor: 'divider', }}
              aria-label="Vertical tabs"
            >
              <Tab label="Width" {...a11yProps(0)} />
              <Tab label="Brand" {...a11yProps(1)} />
              <Tab label="Colors" {...a11yProps(2)} />
              <Tab label="Design" {...a11yProps(3)} />
              <Tab label="Types" {...a11yProps(4)} />
              <Tab label="Color Theme" {...a11yProps(5)} />
              <Tab label="Occasion" {...a11yProps(6)} />
              <Tab label="Shrinkage" {...a11yProps(7)} />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <List className="filters list-unstyled">
                    {width.map((widths, key) => {
                      var widthChecked = userinfo.fabric_inward_width.includes(widths.width_mea)?"checked":""
                      return (
                        <ListItem>
                          <input type="checkbox" onChange={handleChangeWidth}  value ={widths.width_mea} checked={widthChecked} className='mr-3'/>
                          <span className="filter-title"><IntlMessages id={widths.width_mea} /></span>
                        </ListItem>
                      )
                    })}
                  </List>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <List className="filters list-unstyled">
                    {brand.map((brands, key) => {
                      var brandChecked = userinfo.fabric_inward_sub_brand.includes(brands.fabric_brand_brands)?"checked":""
                      return (
                        <ListItem>
                          <input type="checkbox" onChange={handleChangeBrand} value ={brands.fabric_brand_brands} checked={brandChecked} className='mr-3'/>
                          <span className="filter-title"><IntlMessages id={brands.fabric_brand_brands} /></span>
                        </ListItem>
                      )
                    })}
                  </List>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <List className="filters list-unstyled">
                    {colors.map((color, key) => {
                      var colorChecked = userinfo.fabric_inward_sub_color.includes(color.attr_colour_name)?"checked":""
                      return (
                        <ListItem>
                          <input type="checkbox" onChange={handleChangeColor} value={color.attr_colour_name} checked={colorChecked}  className='mr-3'/>
                          <span className="filter-title"><IntlMessages id={color.attr_colour_name} /></span>
                        </ListItem>
                      )
                    })}
                  </List>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <List className="filters list-unstyled">
                    {designs.map((design, key) => {
                      var designChecked = userinfo.fabric_inward_sub_design.includes(design.attr_design_name)?"checked":""
                      return (
                        <ListItem>
                          <input type="checkbox" onChange={handleChangeDesign} value ={design.attr_design_name} checked={designChecked} className='mr-3'/>
                          <span className="filter-title"><IntlMessages id={design.attr_design_name} /></span>
                        </ListItem>
                      )
                    })}
                  </List>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                  <List className="filters list-unstyled">
                    {types.map((typed, key) => {
                      var typeChecked = userinfo.fabric_inward_sub_type.includes(typed.attr_fabric_type_name)?"checked":""
                      return (
                        <ListItem>
                          <input type="checkbox" onChange={handleChangeType} value ={typed.attr_fabric_type_name} checked={typeChecked} className='mr-3'/>
                          <span className="filter-title"><IntlMessages id={typed.attr_fabric_type_name} /></span>
                        </ListItem>
                      )
                    })}
                  </List>
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                  <List className="filters list-unstyled">
                    {colorTheme.map((colort, key) => {
                      var otherChecked = userinfo.fabric_inward_sub_color_theme.includes(colort.attr_colour_theme_name)?"checked":""
                      return (
                        <ListItem>
                          <input type="checkbox" onChange={handleChangeColorTheme} value ={colort.attr_colour_theme_name} checked={otherChecked} className='mr-3'/>
                          <span className="filter-title"><IntlMessages id={colort.attr_colour_theme_name} /></span>
                        </ListItem>
                      )
                    })}
                  </List>
                </TabPanel>
                <TabPanel value={value} index={6} dir={theme.direction}>
                  <List className="filters list-unstyled">
                    {occasion.map((colort, key) => {
                      var occasionChecked = userinfo.fabric_inward_sub_occasion.includes(colort.occasion_name)?"checked":""
                      return (
                        <ListItem>
                          <input type="checkbox" onChange={handleChangeColorTheme} value ={colort.occasion_name} checked={occasionChecked} className='mr-3'/>
                          <span className="filter-title"><IntlMessages id={colort.occasion_name} /></span>
                        </ListItem>
                      )
                    })}
                  </List>
                </TabPanel>
                <TabPanel value={value} index={7} dir={theme.direction}>
                  <List className="filters list-unstyled">
                    {shrinkage.map((shrinkages, key) => {
                      var shrinkageChecked = userinfo.fabric_inward_sub_shrinkage.includes(shrinkages.shrinkage_length+"x"+shrinkages.shrinkage_width)?"checked":""
                      return(
                        <ListItem>
                          <input type="checkbox" onChange={handleChangeShrinkage} value ={shrinkages.shrinkage_length+"x"+shrinkages.shrinkage_width} checked={shrinkageChecked} className='mr-3'/>
                          <span className="filter-title"><IntlMessages id={shrinkages.shrinkage_length+"x"+shrinkages.shrinkage_width} /></span>
                        </ListItem>
                      )
                    })}
                  </List>
                </TabPanel>
            </SwipeableViews>
          </Box> 
          <List className="filters" style={{marginTop:'20px'}}>
            <ListItem button>
              <Button color="primary" onClick={(e) => submitFilter(e)} className="text-white mr-10 mb-10" variant="contained" >
                <IntlMessages id="Apply Filter" />
              </Button>
              <Button color="primary" onClick={(e) => clearFilter(e)} className="text-white mr-10 mb-10" variant="contained" >
                <IntlMessages id="Clear Filter" />
              </Button>
            </ListItem>
          </List> 
        </div>
    );

    return (
        <div className="todo-wrapper">
          <div>
           
            <Drawer anchor="right" open={right} onClose={toggleDrawer(setRight, false)}>
               <div tabIndex={0} role="button" onClick={toggleDrawer(setRight, true)}
                  onKeyDown={toggleDrawer(setRight, false)}>
                  {sideList}
               </div>
            </Drawer>
            <div className="donorbtns">
              
              <Button
                title="Filter"
                style={{ display:"inline-block"}}
                className="mr-10 mb-10 btn-get-started"
                color="primary"
                onClick={toggleDrawer(setRight, true)}
              >
                 <i className='ti-filter tour-step-6'></i> Filter
              </Button>
            
              <Button
                title="Clear Filter"
                style={{ display:"inline-block"}}
                className="mr-10 mb-10 btn-get-start"
                color="primary"
                onClick={(e) => clearFilter(e)} 
              >
                <i className='ti-close tour-step-6'></i> Clear Filter
              </Button>
            
          </div>
              <div className={`bg-transparent`} style={{marginTop:'60px'}}>
              
                 <MUIDataTable
                    title={"Purchase Fabric"}
                    data={datas}
                    columns={columns}
                    options={options1}
                    
                  />
              </div>
           </div>
           
        </div>
     );
}
export default Filter;