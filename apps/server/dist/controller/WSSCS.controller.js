"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupervisorUsersShifting = exports.UpdateAllComplaints = exports.Statistics = exports.AdminLogout = exports.SignIn = exports.Register = void 0;
const WsscsAdmin_schema_1 = require("../Models/WsscsAdmin.schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const citizen_schema_1 = require("../Models/citizen.schema");
const supervisor_schema_1 = require("../Models/supervisor.schema");
const complaint_schema_1 = require("../Models/complaint.schema");
dotenv_1.default.config();
// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY = process.env.JWT_KEY;
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { fullname, shortname, logo, WSSC_CODE, password, isAdmin } = req.body;
    // checking whether there is same wssc organization registered or not
    // encrypt password by using bcrypt algorithm
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashPassword = bcryptjs_1.default.hashSync(password, salt);
    console.log(hashPassword);
    try {
        const admin = yield WsscsAdmin_schema_1.AdminsModel.findOne({ WSSC_CODE: req.body.WSSC_CODE });
        console.log(admin);
        if (!admin) {
            const RegisterWSSC = new WsscsAdmin_schema_1.AdminsModel({ fullname, shortname, logo, WSSC_CODE: WSSC_CODE, isAdmin: isAdmin, password: hashPassword });
            yield RegisterWSSC.save();
            const _a = RegisterWSSC._doc, { password } = _a, detail = __rest(_a, ["password"]);
            res.status(200).json(Object.assign({ success: true, status: 200 }, detail));
        }
        else {
            res.status(403).json({ success: false, status: 403, message: "this organization has already registered!" });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, status: 500, error });
    }
});
exports.Register = Register;
// SignIn controller
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { WSSC_Code, password } = req.body;
    console.log(req.body);
    // first we need to validate the data before saving it in DB
    // const { error } = SignIn_validate(req.body);
    // if (error) return res.send(error.details[0].message);
    try {
        console.log("inside admin page");
        const admin = yield WsscsAdmin_schema_1.AdminsModel.findOne({ WSSC_CODE: req.body.WSSC_CODE });
        if (!admin)
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Wrong Credentials",
            });
        // Now checking password
        const isCorrect = yield bcryptjs_1.default.compare(req.body.password, admin.password);
        // if the password is wrong.
        if (!isCorrect)
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password is incorrect",
            });
        // if the user credential is okay then we assign/send jwt token for authentication and authorization
        const adminToken = jsonwebtoken_1.default.sign({ id: admin._id, name: admin.shortname, isAdmin: admin.isAdmin, WSSC_CODE: admin.WSSC_CODE }, SECRET_KEY);
        const _b = admin._doc, { password } = _b, detail = __rest(_b, ["password"]);
        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // })
        res.status(200)
            .json({ detail, adminToken });
    }
    catch (error) {
        res.status(500).json({ success: false, status: 500, error });
    }
});
exports.SignIn = SignIn;
// In case of logout, we remove or deleted jwt token.
const AdminLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .clearCookie("access_token", {
            sameSite: "none",
        })
            .status(200)
            .json({
            status: 200,
            success: true,
            message: "Admin Signed Out Successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error,
        });
    }
});
exports.AdminLogout = AdminLogout;
// below controller is used to get the overall statistics on the basis of request/logged WSSC organization
const Statistics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield citizen_schema_1.citizenModel.find({ WSSC_CODE: req.user.WSSC_CODE }); // retrieve no of registered users
        const supervisors = yield supervisor_schema_1.SupervisorModel.find({ WSSC_CODE: req.user.WSSC_CODE, isDeleted: false }); // retrieve no of superisors registered
        const complaints = yield complaint_schema_1.ComplaintModel.find({ WSSC_CODE: req.user.WSSC_CODE }); // retrieve no of registered complaints
        // find no of type of complaints registered
        const solidWasteComplaints = complaints.filter(complaint => complaint.complaintType === 'Solid waste').length;
        const waterSupplyComplaints = complaints.filter(complaint => complaint.complaintType === 'Water Supply').length;
        const wasteWaterComplaints = complaints.filter(complaint => complaint.complaintType === 'Waste water').length;
        const staffComplaints = complaints.filter(complaint => complaint.complaintType === 'Staff').length;
        const otherComplaints = complaints.filter(complaint => complaint.complaintType === 'Other').length;
        const waterSanitation = waterSupplyComplaints + wasteWaterComplaints;
        ;
        // -------- getting current status of each complaints --------------------
        const lastStatusArray = complaints.map(complaint => {
            const lastStatusIndex = complaint.status.length - 1;
            const lastStatus = complaint.status[lastStatusIndex];
            return lastStatus;
        });
        // ----- below filtering is used to get the current status of each complaint ----------
        const initiatedStatus = lastStatusArray.filter(status => status.state === 'Initiated');
        const inProgressStatus = lastStatusArray.filter(status => status.state === 'InProgress');
        const completedStatus = lastStatusArray.filter(status => status.state === 'Completed');
        const closedStatus = lastStatusArray.filter(status => status.state === 'Closed');
        // ---------- below is the code to get overall organization performance percentage and rating on the basis of complaints submitted by citizens
        let one = 0;
        let two = 0;
        let three = 0;
        let four = 0;
        let five = 0;
        let totalFeedbacks = 0;
        complaints &&
            complaints.forEach((complaint, index) => {
                var _a, _b, _c, _d, _e;
                if (complaint.feedback) {
                    totalFeedbacks += 1;
                }
                if (((_a = complaint === null || complaint === void 0 ? void 0 : complaint.feedback) === null || _a === void 0 ? void 0 : _a.rating) == 1)
                    one += 1;
                if (((_b = complaint === null || complaint === void 0 ? void 0 : complaint.feedback) === null || _b === void 0 ? void 0 : _b.rating) == 2)
                    two += 1;
                if (((_c = complaint === null || complaint === void 0 ? void 0 : complaint.feedback) === null || _c === void 0 ? void 0 : _c.rating) == 3)
                    three += 1;
                if (((_d = complaint === null || complaint === void 0 ? void 0 : complaint.feedback) === null || _d === void 0 ? void 0 : _d.rating) == 4)
                    four += 1;
                if (((_e = complaint === null || complaint === void 0 ? void 0 : complaint.feedback) === null || _e === void 0 ? void 0 : _e.rating) == 5)
                    five += 1;
            });
        let rate = one * 1 + two * 2 + three * 3 + four * 4 + five * 5;
        let totalRating = 0;
        if (rate != 0)
            totalRating = rate / totalFeedbacks;
        const OrgPercentage = (totalRating / 5.00) * 100;
        res.status(200).json({
            status: 200,
            success: true,
            record: {
                users: users.length,
                supervisors: supervisors.length,
                complaints: complaints.length,
            },
            complaints: {
                solidWaste: solidWasteComplaints,
                waterSanitation: waterSanitation,
                Staff: staffComplaints,
                Other: otherComplaints
            },
            complaintsStatus: {
                Initiated: initiatedStatus.length,
                InProgress: inProgressStatus.length,
                Completed: completedStatus.length,
                Closed: closedStatus.length,
            },
            ratingAverages: { totalRating, OrgPercentage }
        });
    }
    catch (error) {
        res.status(404).json({ status: 404, success: false, message: error });
    }
});
exports.Statistics = Statistics;
// update all complaints controller
const UpdateAllComplaints = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update all complaints matching the query
        const updateResult = yield complaint_schema_1.ComplaintModel.updateMany({}, { $set: { WSSC_CODE: 'wsscm23200' } });
        res.status(200).json({ message: 'Complaints updated successfully', updatedCount: updateResult.nModified });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating complaints' });
    }
});
exports.UpdateAllComplaints = UpdateAllComplaints;
// shift all supervisors and users to wsscm
const SupervisorUsersShifting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update all complaints matching the query
        const updateSupervisors = yield supervisor_schema_1.SupervisorModel.updateMany({}, { $set: { WSSC_CODE: 'wsscm23200' } });
        const updateUsers = yield citizen_schema_1.citizenModel.updateMany({}, { $set: { WSSC_CODE: 'wsscm23200' } });
        res.status(200).json({ message: 'Shiftted all users and supervisors records successfully', supervisors: updateSupervisors.length, users: updateUsers.length });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating complaints' });
    }
});
exports.SupervisorUsersShifting = SupervisorUsersShifting;
//# sourceMappingURL=WSSCS.controller.js.map