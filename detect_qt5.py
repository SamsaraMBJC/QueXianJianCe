# 项目名称：DI_QueXianJianCe
# 程序内容：yolov5-Qt5-GUI-detect
# 作   者：MBJC
# 开发时间：2022/11/19 16:13


import argparse
import sys
from pathlib import Path

import cv2
import numpy as np
import torch
import torch.backends.cudnn as cudnn
from PIL import Image
from yolo import YOLO
import os
from tqdm import tqdm

FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]  # YOLOv5 root directory
if str(ROOT) not in sys.path:
    sys.path.append(str(ROOT))  # add ROOT to PATH
ROOT = ROOT.relative_to(Path.cwd())  # relative

class v5detect:
    def __init__(self):
        self.myloadModelInitialize()
        self.model=YOLO()

    def detect(self,img):
        return self.run(img, self.model)

    def run(self, img, model):
        crop = False
        count = False
        image = Image.fromarray(np.uint8(img))
        r_image = self.model.detect_image(image, crop = crop, count=count)
        img_array = np.array(r_image)
        return img,img_array

    def detect_all(self,dir_origin_path):
        return self.run_all(dir_origin_path, self.model)

    def run_all(self, dir_origin_path, model):
        img_names = os.listdir(dir_origin_path)
        dir_save_path = "img_out/"
        for img_name in tqdm(img_names):
            if img_name.lower().endswith(('.bmp', '.dib', '.png', '.jpg', '.jpeg', '.pbm', '.pgm', '.ppm', '.tif', '.tiff')):
                image_path  = os.path.join(dir_origin_path, img_name)
                image       = Image.open(image_path)
                r_image     = self.model.detect_image(image)
                if not os.path.exists(dir_save_path):
                    os.makedirs(dir_save_path)
                r_image.save(os.path.join(dir_save_path, img_name.replace(".jpg", ".png")), quality=95, subsampling=0)

    def myloadModelInitialize(self):
        yolo = YOLO()
        #----------------------------------------------------------------------------------------------------------#
        #   mode用于指定测试的模式：
        #   'predict'           表示单张图片预测，如果想对预测过程进行修改，如保存图片，截取对象等，可以先看下方详细的注释
        #   'video'             表示视频检测，可调用摄像头或者视频进行检测，详情查看下方注释。
        #   'fps'               表示测试fps，使用的图片是img里面的street.jpg，详情查看下方注释。
        #   'dir_predict'       表示遍历文件夹进行检测并保存。默认遍历img文件夹，保存img_out文件夹，详情查看下方注释。
        #   'heatmap'           表示进行预测结果的热力图可视化，详情查看下方注释。
        #   'export_onnx'       表示将模型导出为onnx，需要pytorch1.7.1以上。
        #----------------------------------------------------------------------------------------------------------#
        mode = "predict"
        #-------------------------------------------------------------------------#
        #   crop                指定了是否在单张图片预测后对目标进行截取
        #   count               指定了是否进行目标的计数
        #   crop、count仅在mode='predict'时有效
        #-------------------------------------------------------------------------#
        crop            = False
        count           = False
        #----------------------------------------------------------------------------------------------------------#
        #   video_path          用于指定视频的路径，当video_path=0时表示检测摄像头
        #                       想要检测视频，则设置如video_path = "xxx.mp4"即可，代表读取出根目录下的xxx.mp4文件。
        #   video_save_path     表示视频保存的路径，当video_save_path=""时表示不保存
        #                       想要保存视频，则设置如video_save_path = "yyy.mp4"即可，代表保存为根目录下的yyy.mp4文件。
        #   video_fps           用于保存的视频的fps
        #
        #   video_path、video_save_path和video_fps仅在mode='video'时有效
        #   保存视频时需要ctrl+c退出或者运行到最后一帧才会完成完整的保存步骤。
        #----------------------------------------------------------------------------------------------------------#
        video_path      = 0
        video_save_path = ""
        video_fps       = 25.0
        #----------------------------------------------------------------------------------------------------------#
        #   test_interval       用于指定测量fps的时候，图片检测的次数。理论上test_interval越大，fps越准确。
        #   fps_image_path      用于指定测试的fps图片
        #   
        #   test_interval和fps_image_path仅在mode='fps'有效
        #----------------------------------------------------------------------------------------------------------#
        test_interval   = 100
        fps_image_path  = "img/street.jpg"
        #-------------------------------------------------------------------------#
        #   dir_origin_path     指定了用于检测的图片的文件夹路径
        #   dir_save_path       指定了检测完图片的保存路径
        #   
        #   dir_origin_path和dir_save_path仅在mode='dir_predict'时有效
        #-------------------------------------------------------------------------#
        dir_origin_path = "img/"
        dir_save_path   = "img_out/"
        #-------------------------------------------------------------------------#
        #   heatmap_save_path   热力图的保存路径，默认保存在model_data下
        #   
        #   heatmap_save_path仅在mode='heatmap'有效
        #-------------------------------------------------------------------------#
        heatmap_save_path = "model_data/heatmap_vision.png"
        #-------------------------------------------------------------------------#
        #   simplify            使用Simplify onnx
        #   onnx_save_path      指定了onnx的保存路径
        #-------------------------------------------------------------------------#
        simplify        = False
        onnx_save_path  = "model_data/modelss.onnx"

if __name__ == '__main__':

    yolo = YOLO()
    #----------------------------------------------------------------------------------------------------------#
    #   mode用于指定测试的模式：
    #   'predict'           表示单张图片预测，如果想对预测过程进行修改，如保存图片，截取对象等，可以先看下方详细的注释
    #   'video'             表示视频检测，可调用摄像头或者视频进行检测，详情查看下方注释。
    #   'fps'               表示测试fps，使用的图片是img里面的street.jpg，详情查看下方注释。
    #   'dir_predict'       表示遍历文件夹进行检测并保存。默认遍历img文件夹，保存img_out文件夹，详情查看下方注释。
    #   'heatmap'           表示进行预测结果的热力图可视化，详情查看下方注释。
    #   'export_onnx'       表示将模型导出为onnx，需要pytorch1.7.1以上。
    #----------------------------------------------------------------------------------------------------------#
    mode = "predict"
    #-------------------------------------------------------------------------#
    #   crop                指定了是否在单张图片预测后对目标进行截取
    #   count               指定了是否进行目标的计数
    #   crop、count仅在mode='predict'时有效
    #-------------------------------------------------------------------------#
    crop            = False
    count           = False
    #----------------------------------------------------------------------------------------------------------#
    #   video_path          用于指定视频的路径，当video_path=0时表示检测摄像头
    #                       想要检测视频，则设置如video_path = "xxx.mp4"即可，代表读取出根目录下的xxx.mp4文件。
    #   video_save_path     表示视频保存的路径，当video_save_path=""时表示不保存
    #                       想要保存视频，则设置如video_save_path = "yyy.mp4"即可，代表保存为根目录下的yyy.mp4文件。
    #   video_fps           用于保存的视频的fps
    #
    #   video_path、video_save_path和video_fps仅在mode='video'时有效
    #   保存视频时需要ctrl+c退出或者运行到最后一帧才会完成完整的保存步骤。
    #----------------------------------------------------------------------------------------------------------#
    video_path      = 0
    video_save_path = ""
    video_fps       = 25.0
    #----------------------------------------------------------------------------------------------------------#
    #   test_interval       用于指定测量fps的时候，图片检测的次数。理论上test_interval越大，fps越准确。
    #   fps_image_path      用于指定测试的fps图片
    #   
    #   test_interval和fps_image_path仅在mode='fps'有效
    #----------------------------------------------------------------------------------------------------------#
    test_interval   = 100
    fps_image_path  = "img/street.jpg"
    #-------------------------------------------------------------------------#
    #   dir_origin_path     指定了用于检测的图片的文件夹路径
    #   dir_save_path       指定了检测完图片的保存路径
    #   
    #   dir_origin_path和dir_save_path仅在mode='dir_predict'时有效
    #-------------------------------------------------------------------------#
    dir_origin_path = "img/"
    dir_save_path   = "img_out/"
    #-------------------------------------------------------------------------#
    #   heatmap_save_path   热力图的保存路径，默认保存在model_data下
    #   
    #   heatmap_save_path仅在mode='heatmap'有效
    #-------------------------------------------------------------------------#
    heatmap_save_path = "model_data/heatmap_vision.png"
    #-------------------------------------------------------------------------#
    #   simplify            使用Simplify onnx
    #   onnx_save_path      指定了onnx的保存路径
    #-------------------------------------------------------------------------#
    simplify        = False
    onnx_save_path  = "model_data/modelss.onnx"

    if mode == "predict":
        '''
        1、如果想要进行检测完的图片的保存，利用r_image.save("img.jpg")即可保存，直接在predict.py里进行修改即可。 
        2、如果想要获得预测框的坐标，可以进入yolo.detect_image函数，在绘图部分读取top，left，bottom，right这四个值。
        3、如果想要利用预测框截取下目标，可以进入yolo.detect_image函数，在绘图部分利用获取到的top，left，bottom，right这四个值
        在原图上利用矩阵的方式进行截取。
        4、如果想要在预测图上写额外的字，比如检测到的特定目标的数量，可以进入yolo.detect_image函数，在绘图部分对predicted_class进行判断，
        比如判断if predicted_class == 'car': 即可判断当前目标是否为车，然后记录数量即可。利用draw.text即可写字。
        '''
        img = ('E:\DI_QueXianShiJueJianCe\Pytorch\yolov5-pytorch-main\yolov5-pytorch-main\VOCdevkit\VOC2007\JPEGImages\DJI_0006_02_04.jpg')
        image = Image.open(img)
        r_image = yolo.detect_image(image, crop = crop, count=count)
        r_image.show()