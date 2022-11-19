import cv2
import numpy as np
import os
import os.path as osp


color_dict = {
    0.0: (255, 000, 000),
    1.0: (255, 128, 000),
    2.0: (255, 255, 000),
    3.0: (000, 255, 000),
    4.0: (000, 255, 255),
    5.0: (000, 000, 255),
    6.0: (128, 000, 255),
    7.0: (255, 000, 255),
    8.0: (128, 000, 000),
    9.0: (000, 128, 000),
    10.0: (000, 000, 128)
}


def run_watch_txts(img_dir, txt_dir, out_dir, color):
    IMAGEDIR = osp.abspath(img_dir)
    LABELDIR = osp.abspath(txt_dir)
    OUTDIR = osp.abspath(out_dir)

    png_names = set([name[:-4] for name in os.listdir(IMAGEDIR) if name.endswith('.jpg')])
    txt_names = set([name[:-4] for name in os.listdir(LABELDIR) if name.endswith('.txt')])
    intersection_names = png_names & txt_names

    for name in png_names:
        image = cv2.imread(osp.join(IMAGEDIR, name+".jpg"))

        if name not in intersection_names:
            cv2.imwrite(osp.join(OUTDIR, name+".jpg"), image)
            continue

        IMG_H, IMG_W, IMG_C = image.shape

        with open(osp.join(LABELDIR, name+".txt"), 'r') as fp:
            lines = fp.readlines()

        for line in lines:
            line = line.strip().split(" ")
            # print(line)
            label = float(line[0])
            cx = IMG_W * float(line[1])
            cy = IMG_H * float(line[2])
            w = IMG_W * float(line[3])
            h = IMG_H * float(line[4])
            angle = int(line[5])
            rect = ((cx, cy), (w, h), (angle))
            box = cv2.boxPoints(rect)
            box = np.int0(box)
            cv2.drawContours(image, [box], 0, color_dict[label][::-1], 2)
            # cv2.imshow(" ", image)

        cv2.imwrite(osp.join(OUTDIR, name + ".tif"), image)
        print(name + ", done...")


if __name__ == '__main__':
    BASEDIR = osp.dirname(osp.abspath(__file__))
    
    img_dir = osp.join(BASEDIR, 'imgs')
    txt_dir = osp.join(BASEDIR, 'imgs_txts')
    out_dir = osp.join(BASEDIR, 'imgs_txts_watch')
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)

    run_watch_txts(img_dir, txt_dir, out_dir, color=(250, 200, 250))
