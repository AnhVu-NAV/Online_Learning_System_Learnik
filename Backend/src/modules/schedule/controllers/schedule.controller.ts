import { Response } from 'express';
import { RequestCustom } from '../../../types/express.type';
import * as scheduleService from '../services/schedule.service';
import mongoose from 'mongoose';

export const createSchedule = async (req: RequestCustom, res: Response) => {
    try {
        const userId = req.user?._id;
        const scheduleData = {
            ...req.body,
            userCreated: userId
        };
        
        const schedule = await scheduleService.createSchedule(scheduleData);
        res.status(201).json({
            message: 'Tạo lịch hẹn thành công',
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            message: 'Đã có lỗi xảy ra',
            error
        });
    }
};

export const getScheduleById = async (req: RequestCustom, res: Response) => {
    try {
        const { id } = req.params;
        const schedule = await scheduleService.getScheduleById(id);
        
        if (!schedule) {
            res.status(404).json({
                message: 'Không tìm thấy lịch hẹn'
            });
            return;
        }

        res.status(200).json({
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            message: 'Đã có lỗi xảy ra',
            error
        });
    }
};

export const getAllSchedules = async (req: RequestCustom, res: Response) => {
    try {
        const schedules = await scheduleService.getAllSchedules();
        res.status(200).json({
            data: schedules
        });
    } catch (error) {
        res.status(500).json({
            message: 'Đã có lỗi xảy ra',
            error
        });
    }
};

export const updateSchedule = async (req: RequestCustom, res: Response) => {
    try {
        const { id } = req.params;
        const schedule = await scheduleService.updateSchedule(id, req.body);
        
        if (!schedule) {
            res.status(404).json({
                message: 'Không tìm thấy lịch hẹn'
            });
            return;
        }

        res.status(200).json({
            message: 'Cập nhật lịch hẹn thành công',
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            message: 'Đã có lỗi xảy ra',
            error
        });
    }
};

export const deleteSchedule = async (req: RequestCustom, res: Response) => {
    try {
        const { id } = req.params;
        const schedule = await scheduleService.deleteSchedule(id);
        
        if (!schedule) {
            res.status(404).json({
                message: 'Không tìm thấy lịch hẹn'
            });
            return;
        }

        res.status(200).json({
            message: 'Xóa lịch hẹn thành công'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Đã có lỗi xảy ra',
            error
        });
    }
};

export const joinSchedule = async (req: RequestCustom, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?._id;
        
        if (!userId) {
            res.status(401).json({
                message: 'Không tìm thấy thông tin người dùng'
            });
            return;
        }
        
        const schedule = await scheduleService.joinSchedule(id, userId);
        
        if (!schedule) {
            res.status(404).json({
                message: 'Không tìm thấy lịch hẹn'
            });
            return;
        }

        res.status(200).json({
            message: 'Đăng ký tham gia thành công',
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            message: 'Đã có lỗi xảy ra',
            error
        });
    }
};

export const updateJoinStatus = async (req: RequestCustom, res: Response) => {
    try {
        const { id, userId } = req.params;
        const { status } = req.body;
        
        const schedule = await scheduleService.updateJoinStatus(id, new mongoose.Types.ObjectId(userId), status);
        
        if (!schedule) {
            res.status(404).json({
                message: 'Không tìm thấy lịch hẹn'
            });
            return;
        }

        res.status(200).json({
            message: 'Cập nhật trạng thái tham gia thành công',
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            message: 'Đã có lỗi xảy ra',
            error
        });
    }
};
