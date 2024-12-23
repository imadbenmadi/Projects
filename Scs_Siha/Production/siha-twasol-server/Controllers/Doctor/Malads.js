const { Malad } = require("../../Models/Malad");
const { Company } = require("../../Models/Company");
const { Doctor } = require("../../Models/Doctor");
const { Doctor_Malads } = require("../../Models/Doctor");
const fs = require("fs");
const path = require("path");
// Get all malads
const {
    get_All,
    get_by_id,
    get_own_malads,
    get_own_malad_by_id,
} = require("./Malads/get_malads");
const { add_malads_to_list, remove_malad_from_list } = require("./Malads/List");
const { rate_malad } = require("./Malads/Rate_Malad");

module.exports = {
    get_All,
    get_by_id,
    get_own_malads,
    add_malads_to_list,
    remove_malad_from_list,
    rate_malad,
    get_own_malad_by_id,
};
