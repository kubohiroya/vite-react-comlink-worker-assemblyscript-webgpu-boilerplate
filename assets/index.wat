(module
 (type $0 (func (param i32) (result i32)))
 (type $1 (func (param i32 i32)))
 (type $2 (func (param i32 i32) (result i32)))
 (type $3 (func (param i32)))
 (type $4 (func))
 (type $5 (func (param i32 i32 i32)))
 (type $6 (func (param i32 i32 i32 i32)))
 (type $7 (func (param i32 i32 i64)))
 (type $8 (func (result i32)))
 (type $9 (func (param i32 i32 i32) (result i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "hostModule" "postProgressMessage" (func $src/as/assembly/ASImageObject/postProgressMessage (param i32 i32 i32 i32)))
 (global $src/as/assembly/ASImageObject/nextId (mut i32) (i32.const 1))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/fromSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/total (mut i32) (i32.const 0))
 (global $src/as/assembly/ASImageObject/ASImageObjects.instances (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/pinSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 2016))
 (memory $0 1)
 (data $0 (i32.const 1036) "<")
 (data $0.1 (i32.const 1048) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $1 (i32.const 1100) "<")
 (data $1.1 (i32.const 1112) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00c\00m\00s\00.\00t\00s")
 (data $2 (i32.const 1164) "<")
 (data $2.1 (i32.const 1176) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data $4 (i32.const 1260) ",")
 (data $4.1 (i32.const 1272) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $5 (i32.const 1308) "<")
 (data $5.1 (i32.const 1320) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data $6 (i32.const 1372) "<")
 (data $6.1 (i32.const 1384) "\02\00\00\00$\00\00\00K\00e\00y\00 \00d\00o\00e\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t")
 (data $7 (i32.const 1436) ",")
 (data $7.1 (i32.const 1448) "\02\00\00\00\16\00\00\00~\00l\00i\00b\00/\00m\00a\00p\00.\00t\00s")
 (data $8 (i32.const 1484) "<")
 (data $8.1 (i32.const 1496) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $9 (i32.const 1548) "<")
 (data $9.1 (i32.const 1560) "\02\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $10 (i32.const 1612) "<")
 (data $10.1 (i32.const 1624) "\02\00\00\00,\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00I\00m\00a\00g\00e\00O\00b\00j\00e\00c\00t\00 \00I\00D")
 (data $11 (i32.const 1676) "\\")
 (data $11.1 (i32.const 1688) "\02\00\00\00@\00\00\00s\00r\00c\00/\00a\00s\00/\00a\00s\00s\00e\00m\00b\00l\00y\00/\00A\00S\00I\00m\00a\00g\00e\00O\00b\00j\00e\00c\00t\00.\00t\00s")
 (data $12 (i32.const 1772) ",")
 (data $12.1 (i32.const 1784) "\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $13 (i32.const 1820) "<")
 (data $13.1 (i32.const 1832) "\02\00\00\00*\00\00\00O\00b\00j\00e\00c\00t\00 \00a\00l\00r\00e\00a\00d\00y\00 \00p\00i\00n\00n\00e\00d")
 (data $15 (i32.const 1916) "<")
 (data $15.1 (i32.const 1928) "\02\00\00\00(\00\00\00O\00b\00j\00e\00c\00t\00 \00i\00s\00 \00n\00o\00t\00 \00p\00i\00n\00n\00e\00d")
 (data $17 (i32.const 2016) "\0b\00\00\00 \00\00\00 \00\00\00 ")
 (data $17.1 (i32.const 2040) "A\00\00\00\10A\02\00 \00\00\00\02\01\00\00\02\t\00\00\02\01")
 (export "initialize" (func $src/as/assembly/ASImageObject/initialize))
 (export "createImageObject" (func $src/as/assembly/ASImageObject/createImageObject))
 (export "setImageObjectContent" (func $src/as/assembly/ASImageObject/setImageObjectContent))
 (export "getImageObjectPtrLen" (func $src/as/assembly/ASImageObject/getImageObjectPtrLen))
 (export "deleteImageObject" (func $src/as/assembly/ASImageObject/deleteImageObject))
 (export "applyAverageFilter" (func $src/as/assembly/ASImageObject/applyAverageFilter))
 (export "getImageObjectWidthHeight" (func $src/as/assembly/ASImageObject/getImageObjectWidthHeight))
 (export "__new" (func $~lib/rt/tcms/__new))
 (export "__pin" (func $~lib/rt/tcms/__pin))
 (export "__unpin" (func $~lib/rt/tcms/__unpin))
 (export "__collect" (func $~lib/rt/tcms/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (start $~start)
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1184
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.tee $3
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1184
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $3
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $3
   local.get $3
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $2
   local.get $3
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $3
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1184
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   i32.store offset=8
  end
  local.get $5
  if
   local.get $5
   local.get $4
   i32.store offset=4
  end
  local.get $1
  local.get $0
  local.get $2
  i32.const 4
  i32.shl
  local.get $3
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.tee $1
  i32.load offset=96
  i32.eq
  if
   local.get $1
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $3
    i32.rotl
    i32.and
    local.set $3
    local.get $1
    local.get $3
    i32.store offset=4
    local.get $3
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $2
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 1184
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1184
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1184
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1184
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $1
  i32.const 4
  i32.add
  local.get $2
  i32.add
  i32.ne
  if
   i32.const 0
   i32.const 1184
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $2
   local.get $2
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1184
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  local.get $3
  if
   local.get $3
   local.get $1
   i32.store offset=4
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $0
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $2
  local.get $1
  i64.extend_i32_u
  i64.lt_u
  if
   i32.const 0
   i32.const 1184
   i32.const 382
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $3
  if
   local.get $3
   i32.const 4
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1184
    i32.const 389
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $3
   local.get $1
   i32.const 16
   i32.sub
   local.tee $5
   i32.eq
   if
    local.get $3
    i32.load
    local.set $4
    local.get $5
    local.set $1
   end
  else
   local.get $0
   i32.const 1572
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1184
    i32.const 402
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.wrap_i64
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $4
  i32.const 2
  i32.and
  local.get $3
  i32.const 8
  i32.sub
  local.tee $3
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 4
  i32.add
  local.get $3
  i32.add
  local.tee $3
  i32.const 2
  i32.store
  local.get $0
  local.get $3
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 2064
  i32.const 0
  i32.store
  i32.const 3632
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 2064
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $0
      i32.const 4
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      i32.const 2064
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 2064
  i32.const 3636
  memory.size
  i64.extend_i32_s
  i64.const 16
  i64.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 2064
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/tlsf/prepareSize (param $0 i32) (result i32)
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1056
   i32.const 1184
   i32.const 461
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 12
  i32.le_u
  if (result i32)
   i32.const 12
  else
   local.get $0
   i32.const 19
   i32.add
   i32.const -16
   i32.and
   i32.const 4
   i32.sub
  end
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if
   local.get $1
   i32.const 4
   i32.shr_u
   local.set $1
  else
   local.get $1
   i32.const 536870910
   i32.lt_u
   if
    local.get $1
    i32.const 1
    i32.const 27
    local.get $1
    i32.clz
    i32.sub
    i32.shl
    i32.add
    i32.const 1
    i32.sub
    local.set $1
   end
   local.get $1
   i32.const 31
   local.get $1
   i32.clz
   i32.sub
   local.tee $2
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
   local.set $1
   local.get $2
   i32.const 7
   i32.sub
   local.set $2
  end
  local.get $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1184
   i32.const 334
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 1184
     i32.const 347
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/prepareBlock (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.load
  local.set $3
  local.get $2
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 1184
   i32.const 361
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.get $2
  i32.sub
  local.tee $4
  i32.const 16
  i32.ge_u
  if
   local.get $1
   local.get $2
   local.get $3
   i32.const 2
   i32.and
   i32.or
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $2
   i32.add
   local.tee $1
   local.get $4
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $1
   local.get $3
   i32.const -2
   i32.and
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $0
   local.get $0
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/prepareSize
  local.tee $2
  call $~lib/rt/tlsf/searchBlock
  local.tee $1
  i32.eqz
  if
   memory.size
   local.tee $3
   local.get $2
   i32.const 256
   i32.ge_u
   if (result i32)
    local.get $2
    i32.const 536870910
    i32.lt_u
    if (result i32)
     local.get $2
     i32.const 1
     i32.const 27
     local.get $2
     i32.clz
     i32.sub
     i32.shl
     i32.add
     i32.const 1
     i32.sub
    else
     local.get $2
    end
   else
    local.get $2
   end
   i32.const 4
   local.get $0
   i32.load offset=1568
   local.get $3
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $1
   local.get $1
   local.get $3
   i32.lt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $1
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $0
   local.get $3
   i32.const 16
   i32.shl
   memory.size
   i64.extend_i32_s
   i64.const 16
   i64.shl
   call $~lib/rt/tlsf/addMemory
   local.get $0
   local.get $2
   call $~lib/rt/tlsf/searchBlock
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1184
    i32.const 499
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.gt_u
  if
   i32.const 0
   i32.const 1184
   i32.const 501
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/removeBlock
  local.get $0
  local.get $1
  local.get $2
  call $~lib/rt/tlsf/prepareBlock
  local.get $1
 )
 (func $~lib/rt/tcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.const 1073741804
  i32.gt_u
  if
   i32.const 1056
   i32.const 1120
   i32.const 125
   i32.const 30
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/tlsf/allocateBlock
  local.tee $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  global.get $~lib/rt/tcms/fromSpace
  local.tee $0
  i32.load offset=8
  local.set $1
  local.get $2
  local.get $0
  global.get $~lib/rt/tcms/white
  i32.or
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=8
  local.get $1
  local.get $2
  local.get $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
  local.get $0
  local.get $2
  i32.store offset=8
  global.get $~lib/rt/tcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/tcms/total
  local.get $2
  i32.const 20
  i32.add
 )
 (func $~lib/arraybuffer/ArrayBuffer#constructor (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1280
   i32.const 1328
   i32.const 52
   i32.const 43
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 1
  call $~lib/rt/tcms/__new
  local.tee $1
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
 )
 (func $src/as/assembly/ASImageObject/initialize (result i32)
  i32.const 0
  i32.const 7
  call $~lib/rt/tcms/__new
 )
 (func $~lib/typedarray/Uint8ClampedArray#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  i32.const 12
  i32.const 5
  call $~lib/rt/tcms/__new
  local.tee $1
  i32.eqz
  if
   i32.const 12
   i32.const 3
   call $~lib/rt/tcms/__new
   local.set $1
  end
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1280
   i32.const 1328
   i32.const 19
   i32.const 57
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 1
  call $~lib/rt/tcms/__new
  local.tee $2
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
  local.get $2
  i32.store
  local.get $1
  local.get $2
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $1
 )
 (func $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#rehash" (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $1
  i32.const 1
  i32.add
  local.tee $2
  i32.const 2
  i32.shl
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $6
  local.get $2
  i32.const 3
  i32.shl
  i32.const 3
  i32.div_s
  local.tee $5
  i32.const 12
  i32.mul
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $3
  local.get $0
  i32.load offset=8
  local.tee $7
  local.get $0
  i32.load offset=16
  i32.const 12
  i32.mul
  i32.add
  local.set $4
  local.get $3
  local.set $2
  loop $while-continue|0
   local.get $4
   local.get $7
   i32.ne
   if
    local.get $7
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     local.get $2
     local.get $7
     i32.load
     local.tee $8
     i32.store
     local.get $2
     local.get $7
     i32.load offset=4
     i32.store offset=4
     local.get $2
     local.get $6
     local.get $8
     i32.const -1028477379
     i32.mul
     i32.const 374761397
     i32.add
     i32.const 17
     i32.rotl
     i32.const 668265263
     i32.mul
     local.tee $8
     i32.const 15
     i32.shr_u
     local.get $8
     i32.xor
     i32.const -2048144777
     i32.mul
     local.tee $8
     i32.const 13
     i32.shr_u
     local.get $8
     i32.xor
     i32.const -1028477379
     i32.mul
     local.tee $8
     i32.const 16
     i32.shr_u
     local.get $8
     i32.xor
     local.get $1
     i32.and
     i32.const 2
     i32.shl
     i32.add
     local.tee $8
     i32.load
     i32.store offset=8
     local.get $8
     local.get $2
     i32.store
     local.get $2
     i32.const 12
     i32.add
     local.set $2
    end
    local.get $7
    i32.const 12
    i32.add
    local.set $7
    br $while-continue|0
   end
  end
  local.get $0
  local.get $6
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $3
  i32.store offset=8
  local.get $0
  local.get $5
  i32.store offset=12
  local.get $0
  local.get $0
  i32.load offset=20
  i32.store offset=16
 )
 (func $src/as/assembly/ASImageObject/createImageObject (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $src/as/assembly/ASImageObject/nextId
  local.tee $3
  i32.const 1
  i32.add
  global.set $src/as/assembly/ASImageObject/nextId
  i32.const 12
  i32.const 4
  call $~lib/rt/tcms/__new
  local.tee $2
  i32.const 0
  i32.store
  local.get $2
  i32.const 0
  i32.store offset=4
  local.get $2
  i32.const 0
  i32.store offset=8
  local.get $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $2
  local.get $0
  local.get $1
  i32.mul
  i32.const 2
  i32.shl
  call $~lib/typedarray/Uint8ClampedArray#constructor
  i32.store offset=8
  global.get $src/as/assembly/ASImageObject/ASImageObjects.instances
  local.tee $4
  i32.load
  local.get $3
  i32.const -1028477379
  i32.mul
  i32.const 374761397
  i32.add
  i32.const 17
  i32.rotl
  i32.const 668265263
  i32.mul
  local.tee $0
  local.get $0
  i32.const 15
  i32.shr_u
  i32.xor
  i32.const -2048144777
  i32.mul
  local.tee $0
  local.get $0
  i32.const 13
  i32.shr_u
  i32.xor
  i32.const -1028477379
  i32.mul
  local.tee $0
  local.get $0
  i32.const 16
  i32.shr_u
  i32.xor
  local.tee $1
  local.get $4
  i32.load offset=4
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  block $"__inlined_func$~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#find$192"
   loop $while-continue|0
    local.get $0
    if
     local.get $0
     i32.load offset=8
     local.tee $5
     i32.const 1
     i32.and
     if (result i32)
      i32.const 0
     else
      local.get $0
      i32.load
      local.get $3
      i32.eq
     end
     br_if $"__inlined_func$~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#find$192"
     local.get $5
     i32.const -2
     i32.and
     local.set $0
     br $while-continue|0
    end
   end
   i32.const 0
   local.set $0
  end
  local.get $0
  if
   local.get $0
   local.get $2
   i32.store offset=4
  else
   local.get $4
   i32.load offset=12
   local.tee $0
   local.get $4
   i32.load offset=16
   i32.eq
   if
    local.get $4
    local.get $4
    i32.load offset=20
    local.get $0
    i32.const 3
    i32.mul
    i32.const 4
    i32.div_s
    i32.lt_s
    if (result i32)
     local.get $4
     i32.load offset=4
    else
     local.get $4
     i32.load offset=4
     i32.const 1
     i32.shl
     i32.const 1
     i32.or
    end
    call $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#rehash"
   end
   local.get $4
   i32.load offset=8
   local.set $0
   local.get $4
   local.get $4
   i32.load offset=16
   local.tee $5
   i32.const 1
   i32.add
   i32.store offset=16
   local.get $0
   local.get $5
   i32.const 12
   i32.mul
   i32.add
   local.tee $0
   local.get $3
   i32.store
   local.get $0
   local.get $2
   i32.store offset=4
   local.get $4
   local.get $4
   i32.load offset=20
   i32.const 1
   i32.add
   i32.store offset=20
   local.get $0
   local.get $4
   i32.load
   local.get $1
   local.get $4
   i32.load offset=4
   i32.and
   i32.const 2
   i32.shl
   i32.add
   local.tee $1
   i32.load
   i32.store offset=8
   local.get $1
   local.get $0
   i32.store
  end
  local.get $3
 )
 (func $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#get" (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.load
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const -1028477379
  i32.mul
  i32.const 374761397
  i32.add
  i32.const 17
  i32.rotl
  i32.const 668265263
  i32.mul
  local.tee $0
  i32.const 15
  i32.shr_u
  local.get $0
  i32.xor
  i32.const -2048144777
  i32.mul
  local.tee $0
  i32.const 13
  i32.shr_u
  local.get $0
  i32.xor
  i32.const -1028477379
  i32.mul
  local.tee $0
  i32.const 16
  i32.shr_u
  local.get $0
  i32.xor
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  block $"__inlined_func$~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#find$193"
   loop $while-continue|0
    local.get $0
    if
     local.get $0
     i32.load offset=8
     local.tee $2
     i32.const 1
     i32.and
     if (result i32)
      i32.const 0
     else
      local.get $0
      i32.load
      local.get $1
      i32.eq
     end
     br_if $"__inlined_func$~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#find$193"
     local.get $2
     i32.const -2
     i32.and
     local.set $0
     br $while-continue|0
    end
   end
   i32.const 0
   local.set $0
  end
  local.get $0
  i32.eqz
  if
   i32.const 1392
   i32.const 1456
   i32.const 105
   i32.const 17
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
 )
 (func $~lib/typedarray/Uint8ClampedArray#set<~lib/typedarray/Uint8ClampedArray> (param $0 i32) (param $1 i32)
  (local $2 i32)
  local.get $1
  i32.load offset=8
  local.tee $2
  local.get $0
  i32.load offset=8
  i32.gt_s
  if
   i32.const 1504
   i32.const 1568
   i32.const 1902
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.load offset=4
  local.get $2
  memory.copy
 )
 (func $src/as/assembly/ASImageObject/setImageObjectContent (param $0 i32) (param $1 i32)
  global.get $src/as/assembly/ASImageObject/ASImageObjects.instances
  local.get $0
  call $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#get"
  i32.load offset=8
  local.get $1
  call $~lib/typedarray/Uint8ClampedArray#set<~lib/typedarray/Uint8ClampedArray>
 )
 (func $~lib/rt/__newArray (param $0 i32) (result i32)
  (local $1 i32)
  i32.const 8
  i32.const 1
  call $~lib/rt/tcms/__new
  local.set $1
  i32.const 16
  local.get $0
  call $~lib/rt/tcms/__new
  local.tee $0
  local.get $1
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  i32.const 8
  i32.store offset=8
  local.get $0
  i32.const 2
  i32.store offset=12
  local.get $0
 )
 (func $~lib/rt/tlsf/checkUsedBlock (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.const 15
  i32.and
  i32.const 1
  local.get $0
  select
  if (result i32)
   i32.const 1
  else
   local.get $1
   i32.load
   i32.const 1
   i32.and
  end
  if
   i32.const 0
   i32.const 1184
   i32.const 562
   i32.const 3
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
 )
 (func $~lib/rt/tlsf/moveBlock (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  local.get $2
  call $~lib/rt/tlsf/allocateBlock
  local.tee $2
  i32.const 4
  i32.add
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  memory.copy
  local.get $1
  i32.const 2064
  i32.ge_u
  if
   local.get $1
   local.get $1
   i32.load
   i32.const 1
   i32.or
   i32.store
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/insertBlock
  end
  local.get $2
 )
 (func $~lib/array/Array<usize>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   local.get $1
   i32.const 0
   i32.lt_s
   if
    i32.const 1504
    i32.const 1792
    i32.const 130
    i32.const 22
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   i32.const 1
   i32.add
   local.tee $3
   local.get $0
   i32.load offset=8
   local.tee $4
   i32.const 2
   i32.shr_u
   i32.gt_u
   if
    local.get $3
    i32.const 268435455
    i32.gt_u
    if
     i32.const 1280
     i32.const 1792
     i32.const 19
     i32.const 48
     call $~lib/builtins/abort
     unreachable
    end
    i32.const 1073741820
    local.get $4
    i32.const 1
    i32.shl
    local.tee $5
    local.get $5
    i32.const 1073741820
    i32.ge_u
    select
    local.tee $5
    i32.const 8
    local.get $3
    local.get $3
    i32.const 8
    i32.le_u
    select
    i32.const 2
    i32.shl
    local.tee $3
    local.get $3
    local.get $5
    i32.lt_u
    select
    local.set $7
    block $__inlined_func$~lib/rt/tcms/__renew$2 (result i32)
     local.get $0
     i32.load
     local.tee $10
     i32.const 20
     i32.sub
     local.set $3
     local.get $10
     i32.const 2064
     i32.lt_u
     if
      local.get $7
      local.get $3
      i32.load offset=12
      call $~lib/rt/tcms/__new
      local.tee $5
      local.get $10
      local.get $7
      local.get $3
      i32.load offset=16
      local.tee $3
      local.get $3
      local.get $7
      i32.gt_u
      select
      memory.copy
      local.get $5
      br $__inlined_func$~lib/rt/tcms/__renew$2
     end
     local.get $7
     i32.const 1073741804
     i32.gt_u
     if
      i32.const 1056
      i32.const 1120
      i32.const 143
      i32.const 30
      call $~lib/builtins/abort
      unreachable
     end
     global.get $~lib/rt/tcms/total
     local.get $3
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/tcms/total
     global.get $~lib/rt/tlsf/ROOT
     i32.eqz
     if
      call $~lib/rt/tlsf/initialize
     end
     local.get $7
     i32.const 16
     i32.add
     local.set $11
     local.get $10
     i32.const 16
     i32.sub
     local.tee $3
     i32.const 2064
     i32.lt_u
     if
      global.get $~lib/rt/tlsf/ROOT
      local.get $3
      call $~lib/rt/tlsf/checkUsedBlock
      local.get $11
      call $~lib/rt/tlsf/moveBlock
      local.set $3
     else
      block $__inlined_func$~lib/rt/tlsf/reallocateBlock$197
       global.get $~lib/rt/tlsf/ROOT
       local.set $12
       local.get $3
       call $~lib/rt/tlsf/checkUsedBlock
       local.set $3
       local.get $11
       call $~lib/rt/tlsf/prepareSize
       local.tee $5
       local.get $3
       i32.load
       local.tee $6
       i32.const -4
       i32.and
       local.tee $13
       i32.le_u
       if
        local.get $12
        local.get $3
        local.get $5
        call $~lib/rt/tlsf/prepareBlock
        br $__inlined_func$~lib/rt/tlsf/reallocateBlock$197
       end
       local.get $3
       i32.const 4
       i32.add
       local.get $3
       i32.load
       i32.const -4
       i32.and
       i32.add
       local.tee $8
       i32.load
       local.tee $9
       i32.const 1
       i32.and
       if
        local.get $13
        i32.const 4
        i32.add
        local.get $9
        i32.const -4
        i32.and
        i32.add
        local.tee $9
        local.get $5
        i32.ge_u
        if
         local.get $12
         local.get $8
         call $~lib/rt/tlsf/removeBlock
         local.get $3
         local.get $6
         i32.const 3
         i32.and
         local.get $9
         i32.or
         i32.store
         local.get $12
         local.get $3
         local.get $5
         call $~lib/rt/tlsf/prepareBlock
         br $__inlined_func$~lib/rt/tlsf/reallocateBlock$197
        end
       end
       local.get $12
       local.get $3
       local.get $11
       call $~lib/rt/tlsf/moveBlock
       local.set $3
      end
     end
     local.get $3
     i32.const 20
     i32.add
     local.tee $3
     i32.const 20
     i32.sub
     local.tee $5
     local.get $7
     i32.store offset=16
     local.get $5
     i32.load offset=4
     i32.const -4
     i32.and
     local.get $5
     i32.store offset=8
     local.get $5
     i32.load offset=8
     local.tee $6
     local.get $5
     local.get $6
     i32.load offset=4
     i32.const 3
     i32.and
     i32.or
     i32.store offset=4
     global.get $~lib/rt/tcms/total
     local.get $5
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.add
     global.set $~lib/rt/tcms/total
     local.get $3
    end
    local.tee $3
    local.get $4
    i32.add
    i32.const 0
    local.get $7
    local.get $4
    i32.sub
    memory.fill
    local.get $3
    local.get $10
    i32.ne
    if
     local.get $0
     local.get $3
     i32.store
     local.get $0
     local.get $3
     i32.store offset=4
    end
    local.get $0
    local.get $7
    i32.store offset=8
   end
   local.get $0
   local.get $1
   i32.const 1
   i32.add
   i32.store offset=12
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
 )
 (func $src/as/assembly/ASImageObject/getImageObjectPtrLen (param $0 i32) (result i32)
  (local $1 i32)
  global.get $src/as/assembly/ASImageObject/ASImageObjects.instances
  local.get $0
  call $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#get"
  local.tee $1
  i32.eqz
  if
   i32.const 1632
   i32.const 1696
   i32.const 46
   i32.const 21
   call $~lib/builtins/abort
   unreachable
  end
  i32.const 8
  call $~lib/rt/__newArray
  local.tee $0
  i32.load offset=4
  drop
  local.get $0
  i32.const 0
  local.get $1
  i32.load offset=8
  i32.load offset=4
  call $~lib/array/Array<usize>#__set
  local.get $0
  i32.const 1
  local.get $1
  i32.load offset=8
  i32.load offset=8
  call $~lib/array/Array<usize>#__set
  local.get $0
 )
 (func $src/as/assembly/ASImageObject/deleteImageObject (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  block $"__inlined_func$~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#delete$3"
   global.get $src/as/assembly/ASImageObject/ASImageObjects.instances
   local.tee $2
   i32.load
   local.get $2
   i32.load offset=4
   local.get $0
   local.tee $1
   i32.const -1028477379
   i32.mul
   i32.const 374761397
   i32.add
   i32.const 17
   i32.rotl
   i32.const 668265263
   i32.mul
   local.tee $0
   local.get $0
   i32.const 15
   i32.shr_u
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $0
   local.get $0
   i32.const 13
   i32.shr_u
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $0
   local.get $0
   i32.const 16
   i32.shr_u
   i32.xor
   i32.and
   i32.const 2
   i32.shl
   i32.add
   i32.load
   local.set $0
   block $"__inlined_func$~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#find$203"
    loop $while-continue|0
     local.get $0
     if
      local.get $0
      i32.load offset=8
      local.tee $3
      i32.const 1
      i32.and
      if (result i32)
       i32.const 0
      else
       local.get $0
       i32.load
       local.get $1
       i32.eq
      end
      br_if $"__inlined_func$~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#find$203"
      local.get $3
      i32.const -2
      i32.and
      local.set $0
      br $while-continue|0
     end
    end
    i32.const 0
    local.set $0
   end
   local.get $0
   i32.eqz
   br_if $"__inlined_func$~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#delete$3"
   local.get $0
   local.get $0
   i32.load offset=8
   i32.const 1
   i32.or
   i32.store offset=8
   local.get $2
   local.get $2
   i32.load offset=20
   i32.const 1
   i32.sub
   i32.store offset=20
   local.get $2
   i32.load offset=4
   i32.const 1
   i32.shr_u
   local.tee $0
   i32.const 1
   i32.add
   i32.const 4
   local.get $2
   i32.load offset=20
   local.tee $1
   local.get $1
   i32.const 4
   i32.lt_u
   select
   i32.ge_u
   if (result i32)
    local.get $2
    i32.load offset=20
    local.get $2
    i32.load offset=12
    i32.const 3
    i32.mul
    i32.const 4
    i32.div_s
    i32.lt_s
   else
    i32.const 0
   end
   if
    local.get $2
    local.get $0
    call $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#rehash"
   end
  end
 )
 (func $src/as/assembly/ASImageObject/applyAverageFilter (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  global.get $src/as/assembly/ASImageObject/ASImageObjects.instances
  local.get $0
  call $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#get"
  local.tee $3
  i32.eqz
  if
   i32.const 1632
   i32.const 1696
   i32.const 63
   i32.const 21
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.load offset=8
  local.set $6
  local.get $3
  i32.load
  local.tee $8
  local.get $3
  i32.load offset=4
  local.tee $17
  i32.mul
  i32.const 2
  i32.shl
  call $~lib/typedarray/Uint8ClampedArray#constructor
  local.set $16
  loop $for-loop|0
   local.get $1
   local.get $9
   i32.gt_s
   if
    local.get $0
    local.get $9
    local.get $1
    local.get $2
    call $src/as/assembly/ASImageObject/postProgressMessage
    local.get $16
    local.get $6
    call $~lib/typedarray/Uint8ClampedArray#set<~lib/typedarray/Uint8ClampedArray>
    i32.const 1
    local.set $4
    loop $for-loop|1
     local.get $4
     local.get $17
     i32.const 1
     i32.sub
     i32.lt_s
     if
      i32.const 1
      local.set $7
      loop $for-loop|2
       local.get $7
       local.get $8
       i32.const 1
       i32.sub
       i32.lt_s
       if
        i32.const 0
        local.set $10
        i32.const 0
        local.set $11
        i32.const 0
        local.set $12
        i32.const 0
        local.set $13
        i32.const -1
        local.set $5
        loop $for-loop|3
         local.get $5
         i32.const 1
         i32.le_s
         if
          i32.const -1
          local.set $3
          loop $for-loop|4
           local.get $3
           i32.const 1
           i32.le_s
           if
            local.get $10
            local.get $3
            local.get $7
            i32.add
            local.get $4
            local.get $5
            i32.add
            local.get $8
            i32.mul
            i32.add
            i32.const 2
            i32.shl
            local.tee $14
            local.get $16
            i32.load offset=4
            local.tee $15
            i32.add
            i32.load8_u
            i32.add
            local.set $10
            local.get $11
            local.get $14
            i32.const 1
            i32.add
            local.get $15
            i32.add
            i32.load8_u
            i32.add
            local.set $11
            local.get $12
            local.get $14
            i32.const 2
            i32.add
            local.get $15
            i32.add
            i32.load8_u
            i32.add
            local.set $12
            local.get $13
            local.get $14
            i32.const 3
            i32.add
            local.get $15
            i32.add
            i32.load8_u
            i32.add
            local.set $13
            local.get $3
            i32.const 1
            i32.add
            local.set $3
            br $for-loop|4
           end
          end
          local.get $5
          i32.const 1
          i32.add
          local.set $5
          br $for-loop|3
         end
        end
        local.get $4
        local.get $8
        i32.mul
        local.get $7
        i32.add
        i32.const 2
        i32.shl
        local.tee $3
        local.get $6
        i32.load offset=4
        i32.add
        local.get $10
        i32.const 9
        i32.div_u
        local.tee $5
        i32.const 255
        local.get $5
        i32.sub
        i32.const 31
        i32.shr_s
        i32.or
        local.get $5
        i32.const 31
        i32.shr_u
        i32.const -1
        i32.xor
        i32.and
        i32.store8
        local.get $6
        i32.load offset=4
        local.get $3
        i32.const 1
        i32.add
        i32.add
        local.get $11
        i32.const 9
        i32.div_u
        local.tee $5
        i32.const 255
        local.get $5
        i32.sub
        i32.const 31
        i32.shr_s
        i32.or
        local.get $5
        i32.const 31
        i32.shr_u
        i32.const -1
        i32.xor
        i32.and
        i32.store8
        local.get $6
        i32.load offset=4
        local.get $3
        i32.const 2
        i32.add
        i32.add
        local.get $12
        i32.const 9
        i32.div_u
        local.tee $5
        i32.const 255
        local.get $5
        i32.sub
        i32.const 31
        i32.shr_s
        i32.or
        local.get $5
        i32.const 31
        i32.shr_u
        i32.const -1
        i32.xor
        i32.and
        i32.store8
        local.get $6
        i32.load offset=4
        local.get $3
        i32.const 3
        i32.add
        i32.add
        local.get $13
        i32.const 9
        i32.div_u
        local.tee $3
        i32.const 255
        local.get $3
        i32.sub
        i32.const 31
        i32.shr_s
        i32.or
        local.get $3
        i32.const 31
        i32.shr_u
        i32.const -1
        i32.xor
        i32.and
        i32.store8
        local.get $7
        i32.const 1
        i32.add
        local.set $7
        br $for-loop|2
       end
      end
      local.get $4
      i32.const 1
      i32.add
      local.set $4
      br $for-loop|1
     end
    end
    local.get $9
    i32.const 1
    i32.add
    local.set $9
    br $for-loop|0
   end
  end
  local.get $0
  local.get $1
  local.get $1
  local.get $2
  call $src/as/assembly/ASImageObject/postProgressMessage
 )
 (func $src/as/assembly/ASImageObject/getImageObjectWidthHeight (param $0 i32) (result i32)
  (local $1 i32)
  global.get $src/as/assembly/ASImageObject/ASImageObjects.instances
  local.get $0
  call $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>#get"
  local.tee $1
  i32.eqz
  if
   i32.const 1632
   i32.const 1696
   i32.const 52
   i32.const 21
   call $~lib/builtins/abort
   unreachable
  end
  i32.const 10
  call $~lib/rt/__newArray
  local.tee $0
  i32.load offset=4
  drop
  local.get $0
  i32.const 0
  local.get $1
  i32.load
  call $~lib/array/Array<usize>#__set
  local.get $0
  i32.const 1
  local.get $1
  i32.load offset=4
  call $~lib/array/Array<usize>#__set
  local.get $0
 )
 (func $~lib/rt/tcms/Object#unlink (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.tee $1
  i32.eqz
  if
   local.get $0
   i32.load offset=8
   i32.eqz
   local.get $0
   i32.const 2064
   i32.lt_u
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1120
    i32.const 101
    i32.const 18
    call $~lib/builtins/abort
    unreachable
   end
   return
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  i32.eqz
  if
   i32.const 0
   i32.const 1120
   i32.const 105
   i32.const 16
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tcms/__pin (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $1
   i32.load offset=4
   i32.const 3
   i32.and
   i32.const 3
   i32.eq
   if
    i32.const 1840
    i32.const 1120
    i32.const 181
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   call $~lib/rt/tcms/Object#unlink
   global.get $~lib/rt/tcms/pinSpace
   local.tee $3
   i32.load offset=8
   local.set $2
   local.get $1
   local.get $3
   i32.const 3
   i32.or
   i32.store offset=4
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $1
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   i32.or
   i32.store offset=4
   local.get $3
   local.get $1
   i32.store offset=8
  end
  local.get $0
 )
 (func $~lib/rt/tcms/__unpin (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.const 3
  i32.ne
  if
   i32.const 1936
   i32.const 1120
   i32.const 195
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  call $~lib/rt/tcms/Object#unlink
  global.get $~lib/rt/tcms/fromSpace
  local.tee $0
  i32.load offset=8
  local.set $2
  local.get $1
  local.get $0
  global.get $~lib/rt/tcms/white
  i32.or
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  local.get $2
  local.get $1
  local.get $2
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=8
 )
 (func $~lib/rt/tcms/__collect
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  i32.const 1504
  call $~lib/rt/tcms/__visit
  i32.const 1280
  call $~lib/rt/tcms/__visit
  i32.const 1392
  call $~lib/rt/tcms/__visit
  i32.const 1056
  call $~lib/rt/tcms/__visit
  i32.const 1840
  call $~lib/rt/tcms/__visit
  i32.const 1936
  call $~lib/rt/tcms/__visit
  global.get $src/as/assembly/ASImageObject/ASImageObjects.instances
  local.tee $0
  if
   local.get $0
   call $~lib/rt/tcms/__visit
  end
  global.get $~lib/rt/tcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 1120
     i32.const 213
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
  global.get $~lib/rt/tcms/white
  i32.eqz
  local.set $3
  global.get $~lib/rt/tcms/toSpace
  local.tee $2
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|1
   local.get $0
   local.get $2
   i32.ne
   if
    local.get $3
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1120
     i32.const 223
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|1
   end
  end
  global.get $~lib/rt/tcms/fromSpace
  local.tee $4
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|2
   local.get $0
   local.get $4
   i32.ne
   if
    global.get $~lib/rt/tcms/white
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1120
     i32.const 232
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $1
    local.get $0
    i32.const 2064
    i32.lt_u
    if
     local.get $0
     i32.const 0
     i32.store offset=4
     local.get $0
     i32.const 0
     i32.store offset=8
    else
     global.get $~lib/rt/tcms/total
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/tcms/total
     local.get $0
     i32.const 4
     i32.add
     local.tee $5
     i32.const 2064
     i32.ge_u
     if
      global.get $~lib/rt/tlsf/ROOT
      i32.eqz
      if
       call $~lib/rt/tlsf/initialize
      end
      global.get $~lib/rt/tlsf/ROOT
      local.set $0
      local.get $5
      call $~lib/rt/tlsf/checkUsedBlock
      local.tee $5
      local.get $5
      i32.load
      i32.const 1
      i32.or
      i32.store
      local.get $0
      local.get $5
      call $~lib/rt/tlsf/insertBlock
     end
    end
    local.get $1
    local.set $0
    br $while-continue|2
   end
  end
  local.get $4
  local.get $4
  i32.store offset=4
  local.get $4
  local.get $4
  i32.store offset=8
  local.get $2
  global.set $~lib/rt/tcms/fromSpace
  local.get $4
  global.set $~lib/rt/tcms/toSpace
  local.get $3
  global.set $~lib/rt/tcms/white
 )
 (func $~lib/rt/tcms/__visit (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  global.get $~lib/rt/tcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $1
   call $~lib/rt/tcms/Object#unlink
   global.get $~lib/rt/tcms/toSpace
   local.tee $0
   i32.load offset=8
   local.set $2
   local.get $1
   local.get $0
   global.get $~lib/rt/tcms/white
   i32.eqz
   i32.or
   i32.store offset=4
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $1
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   i32.or
   i32.store offset=4
   local.get $0
   local.get $1
   i32.store offset=8
  end
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $folding-inner1
   block $folding-inner0
    block $invalid
     block $src/as/assembly/ASImageObject/ASImageObjects
      block $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>"
       block $src/as/assembly/ASImageObject/ASImageObject
        block $~lib/string/String
         block $~lib/arraybuffer/ArrayBuffer
          block $~lib/object/Object
           local.get $0
           i32.const 8
           i32.sub
           i32.load
           br_table $~lib/object/Object $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner1 $src/as/assembly/ASImageObject/ASImageObject $folding-inner1 $"~lib/map/Map<u32,src/as/assembly/ASImageObject/ASImageObject>" $src/as/assembly/ASImageObject/ASImageObjects $folding-inner0 $folding-inner0 $folding-inner0 $invalid
          end
          return
         end
         return
        end
        return
       end
       local.get $0
       i32.load offset=8
       local.tee $0
       if
        local.get $0
        call $~lib/rt/tcms/__visit
       end
       return
      end
      local.get $0
      i32.load
      call $~lib/rt/tcms/__visit
      local.get $0
      i32.load offset=16
      i32.const 12
      i32.mul
      local.get $0
      i32.load offset=8
      local.tee $2
      local.tee $0
      i32.add
      local.set $1
      loop $while-continue|0
       local.get $0
       local.get $1
       i32.lt_u
       if
        local.get $0
        i32.load offset=8
        i32.const 1
        i32.and
        i32.eqz
        if
         local.get $0
         i32.load offset=4
         call $~lib/rt/tcms/__visit
        end
        local.get $0
        i32.const 12
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      local.get $2
      call $~lib/rt/tcms/__visit
      return
     end
     return
    end
    unreachable
   end
   local.get $0
   i32.load
   call $~lib/rt/tcms/__visit
   return
  end
  local.get $0
  i32.load
  local.tee $0
  if
   local.get $0
   call $~lib/rt/tcms/__visit
  end
 )
 (func $~start
  (local $0 i32)
  i32.const 1236
  i32.const 1232
  i32.store
  i32.const 1240
  i32.const 1232
  i32.store
  i32.const 1232
  global.set $~lib/rt/tcms/fromSpace
  i32.const 24
  i32.const 6
  call $~lib/rt/tcms/__new
  local.tee $0
  i32.const 16
  call $~lib/arraybuffer/ArrayBuffer#constructor
  i32.store
  local.get $0
  i32.const 3
  i32.store offset=4
  local.get $0
  i32.const 48
  call $~lib/arraybuffer/ArrayBuffer#constructor
  i32.store offset=8
  local.get $0
  i32.const 4
  i32.store offset=12
  local.get $0
  i32.const 0
  i32.store offset=16
  local.get $0
  i32.const 0
  i32.store offset=20
  local.get $0
  global.set $src/as/assembly/ASImageObject/ASImageObjects.instances
  i32.const 1892
  i32.const 1888
  i32.store
  i32.const 1896
  i32.const 1888
  i32.store
  i32.const 1888
  global.set $~lib/rt/tcms/pinSpace
  i32.const 1988
  i32.const 1984
  i32.store
  i32.const 1992
  i32.const 1984
  i32.store
  i32.const 1984
  global.set $~lib/rt/tcms/toSpace
 )
)
