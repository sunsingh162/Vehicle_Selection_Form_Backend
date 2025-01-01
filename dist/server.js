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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const mockdata_1 = __importDefault(require("./data/mockdata"));
const app = (0, express_1.default)();
const upload = (0, multer_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/mockdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(mockdata_1.default);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch model data' });
    }
}));
app.post('/upload', upload.single('logbook'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = req.body;
        const logbook = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer.toString();
        if (!body.make || !body.model || !body.badge) {
            throw new Error('Missing required fields: make, model, or badge.');
        }
        if (!logbook) {
            throw new Error('Logbook file is missing or invalid.');
        }
        res.json({
            make: body.make,
            model: body.model,
            badge: body.badge,
            logbook,
        });
    }
    catch (err) {
        res
            .status(400)
            .json({ error: err instanceof Error ? err.message : 'An unexpected error occurred' });
    }
}));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
