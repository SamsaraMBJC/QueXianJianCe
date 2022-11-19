import math
import os
import os.path as osp
from unicodedata import name
BASEDIR = osp.dirname(osp.abspath(__file__))
XMLDIR = osp.join(BASEDIR, 'overAlert_xmls')
OUTDIR = osp.join(BASEDIR, 'overAlert_txts')
if not osp.exists(OUTDIR):
    os.makedirs(OUTDIR)

xmlnames = [i for i in os.listdir(XMLDIR) if i.endswith('.xml')]
# print(names)

classes = ['dirt', 'damag']

for xmlname in xmlnames:
    cx = []
    cy = []
    w = []
    h = []
    angle = []
    names = []

    txtname = xmlname.split('.')[-2]+'.txt'
    
    with open(osp.join(OUTDIR, txtname), 'w') as fp:
        fp.write('')
    with open(osp.join(XMLDIR, xmlname), 'r') as fp:
        lines = fp.readlines()
    for line in lines:
        # print(line, end='')
        if line.strip().startswith('<width>'):
            img_width = eval(line.strip().strip('<width>').strip('</width>'))
            # print(img_width)
        if line.strip().startswith('<height>'):
            img_height = eval(line.strip().strip('<height>').strip('</height>'))
            # print(img_height)
        if line.strip().startswith('<depth>'):
            img_depth = eval(line.strip().strip('<depth>').strip('</depth>'))
            # print(img_depth)
        if line.strip().startswith('<name>'):
            names.append(classes.index(line.strip().strip('<name>').strip('</name>')))
            # print(names)
        if line.strip().startswith('<cx>'):
            cx.append(eval(line.strip().strip('<cx>').strip('</cx>')))
            # print(cx)
        if line.strip().startswith('<cy>'):
            cy.append(eval(line.strip().strip('<cy>').strip('</cy>')))
            # print(cy)
        if line.strip().startswith('<w>'):
            w.append(eval(line.strip().strip('<w>').strip('</w>')))
            # print(w)
        if line.strip().startswith('<h>'):
            h.append(eval(line.strip().strip('<h>').strip('</h>')))
            # print(h)
        if line.strip().startswith('<angle>'):
            angle.append(eval(line.strip().strip('<angle>').strip('</angle>')))
            # print(angle)

    for i in range(len(cx)):
        cls0 = names[i]
        cx_i = cx[i] / img_width
        cy_i = cy[i] / img_height
        w_i = w[i] / img_width
        h_i = h[i] / img_height
        a_i = int(angle[i] * 180 / math.pi)

        if w_i < h_i:
            h_i, w_i = w_i, h_i
            a_i -= 90
            if a_i < 0:
                a_i += 180

        put_str = ' '.join([str(cls0), str(cx_i), str(cy_i), str(w_i), str(h_i), str(a_i)])
        with open(osp.join(OUTDIR, txtname), 'a') as fp:
            fp.write(put_str)
            fp.write('\n')
    print(xmlname, 'to', txtname, 'done.')

